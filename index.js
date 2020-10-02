// const Person = require("./person");
// const p1 = new Person("Yoda", 900);
// const Logger = require("./logger");

// !apkvfhbkchcqbhmwso@avxrja.com

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// Middleware function
const logger = (req, res, next) => {
  console.log("logged");
  next();
};

// Middleware use
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected");
  }
);
// import routes
const postRoutes = require("./routes/post");

// Routes middleware
app.use("/post", postRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello there");
});

app.post("/post", (req, res) => {
  res.send("Post here lamo");
});
// * Listen
app.listen(3000, () => {
  console.log("Port: " + 3000);
});

// const log = new Logger();

// Logger.on("message", (data) => console.log(`called listener:`, data));

// Logger.log("hello there");
