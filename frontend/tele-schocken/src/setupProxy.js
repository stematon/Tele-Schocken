const proxy = require('http-proxy-middleware');

console.log("Setup proxy")
module.exports = function(app){
  const proxyUrl= "http://localhost:3000";
  console.log(`Proxying request to: ${proxyUrl}`)
  app.use(
    proxy("/api", {
      target: proxyUrl, 
      changeOrigin: true,
      logLevel: "warn",
      onProxyRes: proxyRes =>{
        console.log("ProxyStuff", proxyRes)
      }
    })
  );
}


