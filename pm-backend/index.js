require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("./queries/auth");
const cors = require("cors");

const app = express();

// app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi mom</h1>");
  //   res.json({ message: "Hi from Express!" });
});

app.post("/login", authenticate.login);
app.post("/signup", authenticate.signUp);

app.listen(3001, () => console.log("Server listening on 3001"));
