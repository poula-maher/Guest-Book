
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
  req.on("end", () => {
    const data = JSON.parse(body);
    console.log(data);
    const message = data.message;
    const userId = data.userId;
    const newMessage = new Message(message, userId);
    newMessage
      .save()
      .then(result => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(result));
      })
      .catch(err => {
        console.log(err);
      });
  });
};
