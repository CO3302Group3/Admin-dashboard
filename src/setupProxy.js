const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // Proxy for Auth Service
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://192.168.8.186',
            changeOrigin: true,
            pathRewrite: {
                '^/auth': '',
            },
        })
    );

    // Proxy for Parking Slots Service
    app.use(
        '/parking_slots',
        createProxyMiddleware({
            target: 'http://192.168.8.186:8004',
            changeOrigin: true,
        })
    );
};
