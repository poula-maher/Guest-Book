const http = require("http");

const mongoConnect = require("./util/database");

const server = http.createServer();

mongoConnect(client => {
  console.log(client);
  server.listen(8080);
});
