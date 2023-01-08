const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/getTest", function (request, response) {
  data = {
    FrontEnd: "前端",
    Sunny: "阳光",
  };

  response.status(500);
  response.send(data);
  // response.send(data);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
