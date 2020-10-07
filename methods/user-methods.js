const postModel = require("../models/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Register
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json();
  }
  const { username, email, password } = req.body;
  try {
    if (username && email && password) {
      let user = await postModel.user.findOne({ email, username });
      if (user) {
        res.status(400).json({
          message: "User already exists",
        });
      }
      user = new postModel.user({ username, email, password });
      console.log(user);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // user.Id = uuidv4();
      await user.save();
      console.log(user.id);
      const payload = {
        user: user.id,
      };

      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token: token });
      });
    } else {
      res.status(204).json({ message: "required fields" });
    }
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

// Login
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { username, password } = req.body;
  try {
    let user = await postModel.user.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "user not fond" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Incorrect Password" });
    }
    const payLoad = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payLoad, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token: token });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get All blogs
exports.getBlogs = async (req, res, next) => {
  // const errors = validationResult(req);
  const { id } = req.body;
  // console.log(req.body, id);
  try {
    if (!id) {
      return res.status(400).json({ result: "Hmmmm" });
    }
    console.log(id);
    let result = await postModel.user.findById(id);
    console.log(result);
    if (!result) {
      res.status(404).json({ message: "OOps! No data exist" });
    }
    res.status(200).json({ result: result.blogs });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
