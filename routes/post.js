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
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Insert Post
router.post("/", async (req, res) => {
  const post = new postModel.post({
    ...req.body,
  });
  try {
    const savePost = await post.save();
    res.status(200).json(savePost);
  } catch (e) {
    res.status(500).json(e);
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

module.exports = router;
