const fs = require('fs')
module.exports = {
  // baseUrl: '',
  configureWebpack: {
    devtool: 'source-map'
  },

  devServer: {
    proxy: {
      '^/token': {
        target: 'https://www.humanity.com/oauth2/token.php',
        ws: true,
        changeOrigin: true
      },
      '^/humanity': {
        target: 'https://www.humanity.com/api/v2',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/humanity': ''
        }
      }
    }
    // port: 2096,
    // https: {
    //   key: fs.readFileSync('./certs/cf_mobile.key'),
    //   cert: fs.readFileSync('./certs/cf_mobile.pem')
    // }
  },
  pluginOptions: {
    cordovaPath: 'src-cordova',
    moment: {
      locales: ['us/central']
    }
  }
}
