const User = require("../models/User");

const { parse } = require("querystring");

exports.createUser = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    console.log(chunk);
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = parse(body);
    const email = data.email;
    const name = data.name;
    const password = data.password;
    User.getUser(email, password)
      .then(userDoc => {
        if (userDoc) {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
        const user = new User(email, password, name);
        user.save();
      })
      .then(result => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.login = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    console.log(chunk);
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = parse(body);
    const email = data.email;
    const password = data.password;
    const user = User.getUser(email, password)
      .then(result => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      })
      .catch(err => {
        console.log(err);
      });
  });
};
