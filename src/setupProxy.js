const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // API routes to proxy
    createProxyMiddleware({
      target: 'https://backend-crudflask3.onrender.com',  // API server
      changeOrigin: true,
    })
  );
};
