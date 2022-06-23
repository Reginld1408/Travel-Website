
var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();
var serverOne = "http://localhost:8050";

module.exports = function (req, res) {
  if (!req.user || req.user.role != "manager") res.status(403).redirect("/");
   console.log("redirecting to Server1");
   apiProxy.web(req, res, { target: serverOne });
};
