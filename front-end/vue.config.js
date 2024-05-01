module.exports = {
  publicPath: process.env.VUE_APP_DEV_ENVIRONMENT === false ? "/" : "/",
  devServer: {
    port: process.env.VUE_APP_PORT || 80,
    host: process.env.VUE_APP_HOST,
  },
  configureWebpack: {
    entry: "./src/main.js",
  },
};
