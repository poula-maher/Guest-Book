const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://Poula:ZNS86TrVJ8tamPk9@cluster0-br09l.mongodb.net/guestbook?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("connected");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
