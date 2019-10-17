const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy(["/api", "/api/getPlace", "/api/inputFields"], { target: "http://localhost:4000" })
    );
}