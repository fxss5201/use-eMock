module.exports = {
  publicPath: '/use-emock/',
  outputDir: 'dist',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: true,
  parallel: undefined,

  css: {
    sourceMap: true
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
