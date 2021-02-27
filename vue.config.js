// eslint-disable-next-line no-unused-vars
require("path");
module.exports = {
  // 项目部署的基础路径，开发环境的路径为 /
  publicPath: process.env.NODE_ENV ==="production" ? "" : "/",
  // 输出文件目录，开发环境下输出文件夹为 devdist
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  lintOnSave: false,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // CSS 相关选项
  css: {
    // 启用 CSS modules
    // requireModuleExtension: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: { prependData: `@import "./src/styles/main.scss";` }
    },
    // 启用 css modules for all css / pre-processor files.
    modules: false
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,
  pwa: {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: false,    //编辑完是否打开网页
    host: "0.0.0.0",    //指定试用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080,   //访问端口
    https: false,   //编译失败时刷新页面
    hot: true,    //开启热加载
    hotOnly: false,
    proxy: null,  //设置代理
    disableHostCheck: true,
    overlay: {    //全屏模式下是否显示脚本错误
      warning: true,
      errors: true
    },
    before: app => {}
  },
  // 三方插件的选项
  pluginOptions: {
    // ...
  }
};
