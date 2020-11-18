const postModel = require("../models/models");
var ObjectID = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");

// Get Single
exports.getSingle = async (req, res, next) => {
  try {
    const post = await postModel.post
      .find({ _id: req.params.id })
      .populate("userId", "username _id", "");
    if (post === null) {
      res.status(404).json({ status: 404, message: "Not Found" });
    } else {
      res.status(200).json({ status: 200, response: post });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Get All
exports.getAll = async (req, res, next) => {
  try {
    const posts = await postModel.post
      .find()
      .populate("userId", "username _id");
    res.status(200).json({ status: 200, response: posts });
  } catch (err) {
    res.status(500).json({ status: 500, response: err });
  }
};

// Get By userId
exports.getbyId = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(204).json({ status: 204, message: "Id not valid" });
    }
    const result = await postModel.post
      .find({ userId: req.params.id })
      .select("-userId");
    res.status(200).json({ status: 200, response: result });
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Post
exports.InsertData = async (req, res, next) => {
  try {
    // const userId = req.body.userId;
    const post = new postModel.post(req.body);
    // blogId: uuidv4(),
    // const user = await postModel.user.findOne({ userId: userId });
    const user = await postModel.user.findById(req.body.userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user id is incorrect, user not found" });
    }
    const savePost = await post.save();
    res.status(201).json({ status: 201, response: savePost });
  } catch (err) {
    res.status(400).json({ status: 400, response: err });
  }
};

// Put
exports.UpdateData = async (req, res, next) => {
  try {
    const response = await postModel.post.updateOne(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          title: req.body.title,
          smallDesc: req.body.smallDesc,
          description: req.body.description,
          tags: req.body.tags,
        },
      }
    );
    // console.log(ObjectID(req.params.id));
    // console.log(response);
    if (response.nModified === 0) {
      res.status(400).json({
        status: 400,
        response: response.message,
        message: "No Records found",
      });
    } else {
      res.status(201).json({
        status: 201,
        response: response,
        message: "Record updated Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, reponse: err });
  }
};

// Delete
exports.RemoveItem = async (req, res, next) => {
  try {
    const response = await postModel.post.deleteOne({
      _id: ObjectID(req.params.id),
    });
    // console.log(response);
    if (response.deletedCount === 0) {
      res
        .status(404)
        .json({ status: 404, response: response, message: "No Records found" });
    } else {
      res.status(200).json({
        status: 200,
        response: response,
        message: "Record Deleted Successfully",
      });
    }
  } catch (err) {
    res.status(404).json({ status: 404, response: err });
  }
};

// verify Token
exports.verifyToken = async (req, res, next) => {
  try {
    // let payLoad = {};
    let token = req.headers.authorization;

    if (!token) {
      return res
        .status(400)
        .json({ status: 400, response: { message: "Unauthoraised" } });
    }

    token = req.headers.authorization.split(" ")[1];
    console.log(token);
    let isVerified = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
      // {
      //   issuer: "DC",
      //   notBefore: Date.now(),
      //   algorithm: "HS256",
      //   subject: "Token",
      // },
      // (err, verified) => {
      //   console.log("verifying");
      //   if (err) res.status(400).json({ status: 400, message: "not verified" });
      //   else next();
      // }
    );
    if (isVerified) {
      console.log("Verified");
      next();
    } else {
      return res.status(400).json({ status: 400, message: "not verified" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: `${err}` });
  }
};
