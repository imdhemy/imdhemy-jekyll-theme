# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "imdhemy-jekyll-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Mohamad Eldhemy"]
  spec.email         = ["imdhemy@gmail.com"]

  spec.summary       = "Write a short summary, because Rubygems requires one."
  spec.homepage      = "https://imdhemy.com"
  spec.license       = "MIT"
  spec.bindir        = "exe"
  spec.executables   = ["imdhemy-image"]
  spec.require_paths = ["lib"]

  spec.files         = Dir.glob(
    %w[
      _data/**/*
      exe/*
      _includes/**/*
      _layouts/**/*
      _sass/**/*
      assets/css/**/*
      assets/js/dist/**/*
      assets/images/**/*
      lib/**/*
      LICENSE.txt
      README.md
      _config.yml
    ]
  ).select { |f| File.file?(f) }

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.17.0"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-archives", "~> 2.2"
end
