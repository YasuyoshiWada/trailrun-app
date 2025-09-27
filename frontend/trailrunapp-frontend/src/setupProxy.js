const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // 既存の /api/statuses などはそのまま 4000 に転送
  app.use(
    '/api/statuses',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );

  // チャット用リクエストだけ /rooms に書き換えてモックへ
  app.use(
    '/api/rooms',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
