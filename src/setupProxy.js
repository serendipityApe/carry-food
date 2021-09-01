const proxy = require('http-proxy-middleware')

module.exports=function(app){
    app.use(
        proxy('/api1',{
            target:'http://localhost:8081',
            changeOrign:true,
            pathRewrite:{'^/api1':''}
        }),
        proxy('/gaode',{
            target: 'https://restapi.amap.com',
            changeOrigin: true,
            pathRewrite: {
                '^/gaode':''
            }
        })
    )
}