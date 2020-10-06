const express = require("express");
const router = express.Router();
const postModel = require("../models/Post");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json();
  }
  const { username, email, password } = req.body;
  try {
    if (username && email && password) {
      let user = await postModel.user.findOne({ email });
      if (user) {
        res.status(400).json({
          message: "User already exists",
        });
      }
      user = new postModel.user({ username, email, password });
      console.log(user);
      const salt = bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const response = await user.save();
      const payload = {
        user: user.id,
      };

      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token: token, ...response });
      });
    } else {
      res.status(204).json({ message: "required fields" });
    }
  } catch (err) {
    res.status(500).json(`${err}`);
  }
});

router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({ error: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await postModel.user.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "user not fond" });
    }
    const isMatch = bcrypt.compare(password, user.password);

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
      res.status(200).json(token);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
