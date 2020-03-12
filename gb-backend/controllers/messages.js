const User = require("../models/User");
const Message = require("../models/Message");
exports.getMessages = (req, res) => {
  Message.getMessages()
    .then(messages => {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(messages));
    })
    .catch(err => {
      console.log(err);
    });
};
