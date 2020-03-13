const User = require("../models/User");

const { parse } = require("querystring");
const jwt = require("jsonwebtoken");

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
        const user = new User(email, password, name, []);
        user.save();
      })
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
    let loadedUser;
    User.getUser(email, password)
      .then(user => {
        if (!user) {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        }
        loadedUser = user;
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          "somesupersupersecret",
          { expiresIn: "1h" }
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(
          JSON.stringify({ token: token, userId: loadedUser._id.toString() })
        );
      })
      .catch(err => {
        console.log(err);
      });
  });
};
