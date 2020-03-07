const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const isPro = process.env.NODE_ENV === 'production'

// const options = {
//   antDir: path.join(__dirname, './node_modules/ant-design-vue'), // antd包位置
//   stylesDir: path.join(__dirname, './src/assets/css/theme'), // 主题文件所在文件夹
//   varFile: path.join(__dirname, './src/assets/css/theme/variables.less'), // 自定义默认的主题色
//   mainLessFile: path.join(__dirname, './src/assets/css/theme/index.less'), // 项目中其他自定义的样式（如果不需要动态修改其他样式，该文件可以为空）
//   outputFilePath: path.join(__dirname, './public/color.less'), // 提取的less文件输出到什么地方
//   themeVariables: ['@primary-color'], // 要改变的主题变量
//   indexFileName: './public/index.html', // index.html所在位置
//   generateOnce: false
// }

module.exports = {
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
      .set('@utils', resolve('src/utils'))
      .set('@com', resolve('src/components'))
      .set('@img', resolve('src/assets/images'))
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    },
    sourceMap: true
  },
  configureWebpack: config => {
    const commonCfg = {
      // externals: {
      //   'particlesJS': 'particlesJS'
      // }
    }

    // const commonPlugins = [new AntDesignThemePlugin(options)]
    const commonPlugins = []
    const devPlugins = []
    const prodPlugins = [
      new CompressionWebpackPlugin({
        // 使用 gzip 压缩
        algorithm: 'gzip',
        // 处理与此正则相匹配的所有文件
        test: new RegExp(
          '\\.(js|css)$'
        ),
        // 只处理大于此大小的文件
        threshold: 10240,
        // 最小压缩比达到 0.8 时才会被压缩
        minRatio: 0.8
      })
    ]

    if (isPro) {
      return {
        optimization: {
          minimizer: [
            new UglifyPlugin({
              uglifyOptions: {
                warnings: false,
                compress: {
                  drop_console: true,
                  drop_debugger: true
                }
              },
              cache: true,
              parallel: true
            })
          ]
        },
        plugins: prodPlugins.concat(commonPlugins),
        ...commonCfg
      }
    } else {
      return {
        ...commonCfg,
        plugins: devPlugins.concat(commonPlugins)
      }
    }
  }
}
