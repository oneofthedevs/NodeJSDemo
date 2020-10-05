const express = require("express");
const router = express.Router();
const postModel = require("../models/Post");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await postModel.post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Specific post
router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.post.findById(req.params.id);
    if (post === null) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Insert Post
router.post("/", async (req, res) => {
  const post = new postModel.post({
    ...req.body,
  });
  try {
    const savePost = await post.save();
    res.status(201).json(savePost);
  } catch (err) {
    res.status(400).json(err);
  }
  // post
  //   .save()
  //   .then((data) => {
  //     res.status(200).json(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Not added",
  //       error: err,
  //     });
  //   });
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const response = await postModel.post.deleteOne({ _id: req.params.id });
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
});

// Put
router.put("/:id", async (req, res) => {
  try {
    const response = await postModel.post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          priority: req.body.priority,
          completed: req.body.completed,
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
});

module.exports = router;
