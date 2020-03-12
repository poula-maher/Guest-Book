const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://Poula:ZNS86TrVJ8tamPk9@cluster0-br09l.mongodb.net/guestbook?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("connected");
      _db = client.db();

      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  console.log(_db);
  throw "No Database Found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
