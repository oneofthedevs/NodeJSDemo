const postModel = require("../models/Post");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

      await user.save();
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

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ error: errors.array() });
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
