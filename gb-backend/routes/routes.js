const AuthController = require("../controllers/auth");
const User = require("../models/User");

const { parse } = require("querystring");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/signup" method="POST"><input type="text" name="email"><input type="text" name="name"><input type="text" name="password"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/signup" && method === "POST") {
    AuthController.createUser(req, res);
  }
  if (url === "/signin" && method === "POST") {
    AuthController.createUser(req, res);
  }
};

module.exports = routesHandler;
