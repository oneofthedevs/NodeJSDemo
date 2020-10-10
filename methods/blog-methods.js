const postModel = require("../models/models");

// Get Single
exports.getSingle = async (req, res, next) => {
  try {
    const post = await postModel.post
      .find({ _id: req.params.id })
      .populate("userId", "username _id", "");
    if (post === null) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(...post);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get All
exports.getAll = async (req, res, next) => {
  try {
    const posts = await postModel.post
      .find()
      .populate("userId", "username _id");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get By userId
exports.getbyId = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(204).json({ message: "Id not valid" });
    }
    const result = await postModel.post
      .find({ userId: req.params.id })
      .select("-userId");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
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
    res.status(201).json(savePost);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Put
exports.UpdateData = async (req, res, next) => {
  try {
    const response = await postModel.post.updateOne(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          smallDesc: req.body.smallDesc,
          Description: req.body.Description,
        },
      }
    );
    console.log(response);
    if (response.nModified === 0) {
      res
        .status(400)
        .json({ ...response.message, message: "No Records found" });
    } else {
      res
        .status(201)
        .json({ ...response, message: "Record updated Successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

// Delete
exports.RemoveItem = async (req, res, next) => {
  try {
    const response = await postModel.post.deleteOne({ blogId: req.params.id });
    console.log(response);
    if (response.deletedCount === 0) {
      res.status(404).json({ ...response, message: "No Records found" });
    } else {
      res
        .status(200)
        .json({ ...response, message: "Record Deleted Successfully" });
    }
  } catch (err) {
    res.status(404).json(err);
  }
};
