const getDb = require("../util/database").getDb;

class Message {
  constructor(text, userId, _id) {
    this.text = text;
    this.userId = userId;
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

  static getMessages(email, password) {
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
}

module.exports = Message;
