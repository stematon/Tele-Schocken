const proxy = require('http-proxy-middleware');

console.log("Setup proxy")
module.exports = function(app){
  const proxyUrl= "http://tele-schocken.de:8000";
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


