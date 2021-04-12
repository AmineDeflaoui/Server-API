const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const port = 3000;

const knex = require("knex");
// const { json } = require("body-parser");

const signIn = require("./controllers/signIn");
const signUp = require("./controllers/signUp");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const deepai = require("./controllers/deepai");
const { json } = require("body-parser");

const DB = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", // localhost
    user: "postgres",
    password: "3010",
    database: "smart_brain",
  },
});

app.use(bodyParser.json());
// app.use(cors());

app.get("/", (req, res) => res.status(200).send("Welcome Home"));

app.post("/signin", (req, res) => signIn.handleSignIn(req, res, DB, bcrypt));

app.post("/signup", (req, res) =>
  signUp.handleSignUp(req, res, DB, bcrypt, saltRounds)
);

app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, DB));

app.put("/image", (req, res) => image.handleImage(req, res, DB));

app.post("/deepai", (req, res) => deepai.handleDeepAi(req, res));

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
