const http = require("http");

const mongoConnect = require("./util/database");

const server = http.createServer();

mongoConnect(() => {
  server.listen(8080);
});
