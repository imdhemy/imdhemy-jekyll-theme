const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'assets/js/src/index.js'),
      formats: ['iife'],
      name: 'ImdhemyTheme',
      fileName: () => 'main.js',
    },
    outDir: 'assets/js/dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: true,
  },
});
