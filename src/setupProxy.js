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
        // createProxyMiddleware("/api/message", {
        createProxyMiddleware("/api/chat/room/*/messages", {
            target: "http://localhost:9090",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/api/chat", {
            target: "http://localhost:8080",
            changeOrigin: true
        })
    );
};
