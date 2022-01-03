import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app:any) {
    app.use(
        '/repos',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
};