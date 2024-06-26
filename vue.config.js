const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const flags = {
        '__VUE_OPTIONS_API__': true,
        '__VUE_PROD_DEVTOOLS__': false,
        '__VUE_PROD_HYDRATION_WARNING__': false,
        '__VUE_PROD_HYDRATION_MISMATCH__': false,
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
      }
      Object.assign(args[0], flags);
      return args;
    });
  },
  transpileDependencies: true
})
