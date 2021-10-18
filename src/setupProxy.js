const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/api/user", {
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/api/post", {
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/api/room", {
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/api/message", {
            target: "http://localhost:8081",
            changeOrigin: true
        })
    );
};
