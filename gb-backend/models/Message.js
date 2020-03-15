const getDb = require("../util/database").getDb;

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class Message {
  constructor(text, userId, username, [], _id) {
    this.text = text;
    this.userId = userId;
    this.username = username;
    this.replys = [];
    this._id = _id;
  }
  save() {
    const db = getDb();
    return db
      .collection("messages")
      .insertOne(this)
      .then(result => {
        console.log("Message Created");
      })
      .catch(err => {
        console.log(err);
      });
  }

  addReply(reply, msgId, userId) {
    const db = getDb();
    return db
      .collection("messages")
      .find({ _id: new ObjectId(msgId) })
      .then(message => {
        message.replys.push(reply);
        message.save();
      });
  }

  static getMessages() {
    const db = getDb();
    return db
      .collection("messages")
      .find()
      .toArray()
      .then(messages => {
        return messages;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(msgId) {
    const db = getDb();
    return db
      .collection("messages")
      .find({ _id: new ObjectId(msgId) })
      .next()
      .then(msg => {
        return msg;
      })
      .catch(err => Console.log(err));
  }

  static deleteMessage(msgId) {
    const db = getDb();
    return db
      .collection("messages")
      .deleteOne({ _id: new ObjectId(msgId) })
      .then(result => {
        console.log("Message Deleted");
      })
      .catch(err => console.log(err));
  }
}

module.exports = Message;
