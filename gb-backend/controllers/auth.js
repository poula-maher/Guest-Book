const User = require("../models/User");

const { parse } = require("querystring");

exports.createUser = (req, res) => {
  let body = "";
  req.on("data", chunk => {
    console.log(chunk);
    body += chunk.toString();
  });
  req.on("end", () => {
    // console.log(parse(body));
    const data = parse(body);
    // console.log(data.email);
    // console.log(data.name);
    // console.log(data.password);
    const email = data.email;
    const name = data.name;
    const password = data.password;
    const user = new User(email, password, name);
    user.save();
  });
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
};
