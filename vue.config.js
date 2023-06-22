const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 
  lintOnSave:false,   //配置关闭eslint
  devServer: {
    /* 自动打开浏览器 */
        port: 9999,    
        https: false,
        hot: "only",
        /* 使用代理 */
        proxy: {
          [process.env.VUE_APP_BASE_API]: {
            /* 目标代理服务器地址 */
            target: process.env.VUE_APP_BASE_SERVER,
            /* 允许跨域 */
            changeOrigin: true,
            pathRewrite: {
              ["^" + process.env.VUE_APP_BASE_API]: "",
            },
            ws: true,
          },
    
     
          "/temp": {
            /* 目标代理服务器地址 */
            target: `${process.env.VUE_APP_BASE_SERVER}/${process.env.VUE_APP_BASE_API}/temp`,
            /* 允许跨域 */
            changeOrigin: true,
            pathRewrite: {
              ["^/temp"]: "",
            },
            ws: true,
          },
    
    
    
        },
    }
})
