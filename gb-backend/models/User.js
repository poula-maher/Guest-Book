const getDb = require("../util/database").getDb;

class User {
  constructor(email, name, password, messages) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.messages = messages;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(result => {
        console.log("User Created");
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getUser(email, password) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ email: email, password: password })
      .then(user => {
        console.log("User found");
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
