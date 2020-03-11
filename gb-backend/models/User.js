const getDb = require("../util/database").getDb;

class User {
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
  save() {
    const db = getDb();
    db.collection("users")
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
