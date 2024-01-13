// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.truckersmp.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/v2', // Rewrite the path to include '/v2'
      },
    })
  );
};