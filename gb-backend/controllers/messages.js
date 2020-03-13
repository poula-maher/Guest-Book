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

exports.createMessage = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    console.log(chunk);
    body += chunk.toString();
  });
  req
    .on("end", () => {
      const data = parse(body);
      const message = data.message;
      User.getUser().then(user => {});
      const newMessage = new Message(message, userId);

      newMessage.save();
    })
    .then(result => {
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    })
    .catch(err => {
      console.log(err);
    });
};
