const User = require("../models/User");
const AuthController = require("../controllers/auth");
const MessagesController = require("../controllers/messages");

const { parse } = require("querystring");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    MessagesController.getMessages(req, res);
  }
  if (url === "/signup" && method === "POST") {
    AuthController.createUser(req, res);
  }
  if (url === "/login" && method === "POST") {
    AuthController.createUser(req, res);
  }
};

module.exports = routesHandler;
