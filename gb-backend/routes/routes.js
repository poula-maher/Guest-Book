const User = require("../models/User");
const AuthController = require("../controllers/auth");
const MessagesController = require("../controllers/messages");

const routesHandler = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    MessagesController.getMessages(req, res);
    // res.write("<html>");
    // res.write("<head><title>Enter Message</title><head>");
    // res.write(
    //   '<body><form action="/create-message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    // );
    // res.write("</html>");
    // return res.end();
  }
  if (url === "/create-message" && method === "POST") {
    MessagesController.createMessage(req, res);
  }
  if (url === "/signup" && method === "POST") {
    AuthController.createUser(req, res);
  }
  if (url === "/login" && method === "POST") {
    AuthController.login(req, res);
  }
};

module.exports = routesHandler;
