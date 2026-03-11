# frozen_string_literal: true

require "fileutils"
require "optparse"
require "pathname"
require "shellwords"
require "tmpdir"

module Imdhemy
  module Jekyll
    module Theme
      class ImageCLI
        SUPPORTED_EXTENSIONS = %w[.jpg .jpeg .png].freeze

        Result = Struct.new(:path, :status, :original_size, :optimized_size, :message, keyword_init: true)

        def self.run(argv)
          new(argv).run
        end

        def initialize(argv)
          @argv = argv.dup
          @options = {
            recursive: false,
            dry_run: false
          }
        end

        def run
          parser.parse!(@argv)

          if @argv.empty?
            warn parser.to_s
            return 1
          end

          paths = expand_inputs(@argv)
          if paths.empty?
            warn "No supported image files found."
            return 1
          end

          results = paths.map { |path| optimize_path(path) }
          print_results(results)

          results.any? { |result| result.status == :error } ? 1 : 0
        rescue OptionParser::InvalidOption, OptionParser::MissingArgument => e
          warn e.message
          warn parser.to_s
          1
        end

        private

        def parser
          @parser ||= OptionParser.new do |opts|
            opts.banner = "Usage: imdhemy-image [options] PATH [PATH ...]"

            opts.on("-r", "--recursive", "Scan directories recursively") do
              @options[:recursive] = true
            end

            opts.on("-n", "--dry-run", "Print what would change without writing files") do
              @options[:dry_run] = true
            end

            opts.on("-h", "--help", "Show this help") do
              puts opts
              exit 0
            end
          end
        end

        def expand_inputs(inputs)
          files = inputs.flat_map do |input|
            path = Pathname(input).expand_path
            if path.file?
              supported_file?(path) ? [path] : []
            elsif path.directory?
              collect_directory(path)
            else
              warn "Skipping missing path: #{path}"
              []
            end
          end

          files.uniq
        end

        def collect_directory(directory)
          pattern = @options[:recursive] ? "**/*" : "*"
          directory.glob(pattern).select { |path| path.file? && supported_file?(path) }
        end

        def supported_file?(path)
          SUPPORTED_EXTENSIONS.include?(path.extname.downcase)
        end

        def optimize_path(path)
          optimizer = optimizer_for(path)
          return Result.new(path: path, status: :skipped, message: "No optimizer available for #{path.extname.downcase}") unless optimizer

          original_size = path.size
          if @options[:dry_run]
            return Result.new(
              path: path,
              status: :dry_run,
              original_size: original_size,
              optimized_size: original_size,
              message: "Would run #{optimizer.label}"
            )
          end

          optimized = optimizer.optimize(path)
          return Result.new(path: path, status: :skipped, original_size: original_size, optimized_size: original_size, message: optimized[:message]) unless optimized[:changed]

          Result.new(
            path: path,
            status: :optimized,
            original_size: original_size,
            optimized_size: path.size,
            message: optimized[:message]
          )
        rescue StandardError => e
          Result.new(path: path, status: :error, original_size: path.exist? ? path.size : nil, message: e.message)
        end

        def optimizer_for(path)
          case path.extname.downcase
          when ".jpg", ".jpeg"
            jpeg_optimizer
          when ".png"
            png_optimizer
          end
        end

        def jpeg_optimizer
          @jpeg_optimizer ||= begin
            if command_available?("jpegoptim")
              ExternalOptimizer.new(
                label: "jpegoptim",
                command_builder: lambda { |path, temp_path|
                  ["jpegoptim", "--strip-all", "--all-progressive", "--dest=#{temp_path.dirname}", path.to_s]
                },
                temp_output_builder: lambda { |path, temp_dir|
                  temp_dir.join(path.basename.to_s)
                }
              )
            elsif command_available?("sips")
              SipsJpegOptimizer.new
            end
          end
        end

        def png_optimizer
          @png_optimizer ||= begin
            if command_available?("oxipng")
              ExternalOptimizer.new(
                label: "oxipng",
                command_builder: lambda { |path, temp_path|
                  ["oxipng", "--strip", "safe", "--opt", "2", "--out", temp_path.to_s, path.to_s]
                },
                temp_output_builder: ->(_path, temp_dir) { temp_dir.join("optimized.png") }
              )
            elsif command_available?("pngcrush")
              ExternalOptimizer.new(
                label: "pngcrush",
                command_builder: lambda { |path, temp_path|
                  ["pngcrush", "-q", "-reduce", "-brute", path.to_s, temp_path.to_s]
                },
                temp_output_builder: ->(_path, temp_dir) { temp_dir.join("optimized.png") }
              )
            end
          end
        end

        def command_available?(command)
          ENV.fetch("PATH", "").split(File::PATH_SEPARATOR).any? do |entry|
            executable = File.join(entry, command)
            File.file?(executable) && File.executable?(executable)
          end
        end

        def print_results(results)
          results.each do |result|
            case result.status
            when :optimized
              saved = result.original_size - result.optimized_size
              percent = percentage(saved, result.original_size)
              puts "optimized #{result.path}: #{human_size(result.original_size)} -> #{human_size(result.optimized_size)} (saved #{percent}%) via #{result.message}"
            when :dry_run
              puts "dry-run #{result.path}: #{result.message}"
            when :skipped
              puts "skipped #{result.path}: #{result.message}"
            when :error
              puts "error #{result.path}: #{result.message}"
            end
          end
        end

        def percentage(saved, original)
          return 0 if original.to_i <= 0

          ((saved.to_f / original) * 100).round(1)
        end

        def human_size(bytes)
          units = %w[B KB MB GB].freeze
          value = bytes.to_f
          unit = units.shift
          while value >= 1024 && !units.empty?
            value /= 1024
            unit = units.shift
          end

          format(value >= 10 || unit == "B" ? "%.0f %s" : "%.1f %s", value, unit)
        end
      end

      class ExternalOptimizer
        def initialize(label:, command_builder:, temp_output_builder:)
          @label = label
          @command_builder = command_builder
          @temp_output_builder = temp_output_builder
        end

        attr_reader :label

        def optimize(path)
          Dir.mktmpdir("imdhemy-image") do |tmpdir|
            temp_dir = Pathname(tmpdir)
            temp_output = @temp_output_builder.call(path, temp_dir)
            command = @command_builder.call(path, temp_output)

            success = system(*command, out: File::NULL, err: File::NULL)
            raise "Optimizer failed: #{Shellwords.join(command)}" unless success

            if !temp_output.exist? || temp_output.size >= path.size
              return { changed: false, message: "#{label} ran but produced no smaller output" }
            end

            FileUtils.cp(temp_output, path)
            { changed: true, message: label }
          end
        end
      end

      class SipsJpegOptimizer
        attr_reader :label

        def initialize
          @label = "sips"
        end

        def optimize(path)
          Dir.mktmpdir("imdhemy-image") do |tmpdir|
            temp_output = Pathname(tmpdir).join(path.basename.to_s)
            success = system(
              "sips",
              "-s", "format", "jpeg",
              "-s", "formatOptions", "best",
              path.to_s,
              "--out", temp_output.to_s,
              out: File::NULL,
              err: File::NULL
            )
            raise "Optimizer failed: sips" unless success

            if !temp_output.exist? || temp_output.size >= path.size
              return { changed: false, message: "#{label} ran but produced no smaller output" }
            end

            FileUtils.cp(temp_output, path)
            { changed: true, message: label }
          end
        end
      end
    end
  end
end
