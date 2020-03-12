const http = require("http");

const mongoConnect = require("./util/database").mongoConnect;
const routes = require("./routes/routes");

const server = http.createServer(routes);

mongoConnect(() => {
  server.listen(8080);
});

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//     );
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
//   });
