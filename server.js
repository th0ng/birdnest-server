const app = require("./app");
const http = require("http");
const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
