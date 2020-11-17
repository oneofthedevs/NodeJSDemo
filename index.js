const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

// const express_session = require("express-session");

const DB_URL =
  "mongodb+srv://oneofthedevs:$iAmTheUser@nodejsdemo.dwtui.mongodb.net/NodeJSDemo?retryWrites=true&w=majority";

require("dotenv/config");

// Middleware function
const logger = (req, res, next) => {
  console.log("logged");
  next();
};

// Middleware use
app.use(cors());
app.use(bodyParser.json());

// app.use(logger);

// Connect to DB
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    try {
      console.log("connected");
    } catch (e) {
      console.log(err + e);
    }
  }
);

// Post Middleware
app.post("/blog", (req, res) => {
  res.send("Post here lamo");
});

// Routes middleware
app.use("/blog", blogRoutes);
app.use("/user", userRoutes);

// Routes
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Incorrect URL" });
});

// * Listen
app.listen(3000, () => {
  console.log("Port: " + 3000);
});
