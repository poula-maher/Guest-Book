const User = require("../models/User");
const AuthController = require("../controllers/auth");
const MessagesController = require("../controllers/messages");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // MessagesController.getMessages(req, res);
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/login" method="POST"><input type="text" name="email"><input type="text" name="password"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/signup" && method === "POST") {
    AuthController.createUser(req, res);
  }
  if (url === "/login" && method === "POST") {
    AuthController.login(req, res);
  }
};

module.exports = routesHandler;
