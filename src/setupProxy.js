const { createProxyMiddleware } = require('http-proxy-middleware');

//配置跨域  代理
module.exports = function (app){
    app.use(
        createProxyMiddleware('/api',{
            target:'http://localhost:8010/',
            changeOrigin:true,
            pathRewrite:{'^/api':""}
        }

        )
    )


}