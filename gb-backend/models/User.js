const getDb = require("../util/database").getDb;
const db = getDb();

class User {
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
  save() {
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
    return db
      .collection("users")
      .findOne({ email: email, password: password })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
