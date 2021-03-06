const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const csurf = require("csurf");
// const { v4: uuidv4 } = require("uuid");

const postModel = require("../models/models");
const { sendMail } = require("../Logic/Mail");
const { post } = require("request");

// Register
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 400, response: { message: "Some fields are empty" } });
  }
  const { username, email, password } = req.body;
  try {
    if (username && email && password) {
      let user = await postModel.user.findOne({ email, username });
      if (user) {
        return res.status(400).json({
          status: 404,
          message: "User already exists",
        });
      }
      user = new postModel.user({ username, email, password });
      console.log(user);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user = await user.save();
      const payload = {
        user: user._id,
      };

      let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
        algorithm: "HS256",
      });

      if (await sendMail(email)) {
        return res
          .status(200)
          .json({ status: 200, response: { token: accessToken } });
      } else {
        await user.deleteOne();
        return res
          .status(400)
          .json({ status: 400, response: { message: "Something went wrong" } });
      }
    } else {
      res.status(204).json({ status: 204, message: "required fields" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, resposne: `${err}` });
  }
};

// verify
exports.verify = async (req, res, next) => {
  try {
    jwt.verify(
      req.body.token,
      "secret",
      {
        issuer: "DC",
        notBefore: Date.now(),
        algorithm: "HS256",
        subject: "Token",
      },
      (err, verified) => {
        if (err) res.status(400).json({ status: 400, message: "not verified" });
        else res.status(200).json({ status: 200, message: verified });
      }
    );
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Login
exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      response: errors.array(),
      message: "Unauthoraised",
    });
  }
  const { username, password } = req.body;
  try {
    let user = await postModel.user.findOne({ username });
    if (!user) {
      res.status(404).json({ status: 404, message: "user not fond" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ status: 400, message: "Incorrect Password" });
    }
    const payLoad = {
      user: {
        id: user.id,
      },
    };

    let accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: Date.now() + process.env.ACCESS_TOKEN_LIFE,
      algorithm: "HS256",
    });

    let refreshToken = jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
      algorithm: "HS256",
    });

    res
      .status(200)
      // .setHeader("Set-Cookie", `jwt=${accessToken}; HttpOnly; Max-Age=3600`)
      .json({ status: 200, resposne: { token: accessToken } });
  } catch (err) {
    res.status(500).json({ status: 500, error: `${err}` });
  }
};

// Get All users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await postModel.user.find().select("-password");
    res.status(200).json({ status: 200, response: users });
  } catch (err) {
    res.status(500), json({ status: 500, message: err });
  }
};

// Get All blogs
exports.getBlogs = async (req, res, next) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ status: 400, response: "Hmmmm" });
    }
    console.log(id);
    let result = await postModel.user.find({ _id: id });
    console.log(result);
    if (!result) {
      res.status(404).json({ status: 404, message: "OOps! No data exist" });
    }
    res.status(200).json({ status: 200, response: result.blogs });
  } catch (err) {
    res.status(500).json({ status: 500, response: err });
  }
};
