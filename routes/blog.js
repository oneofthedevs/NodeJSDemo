const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog-controller");
const { check } = require("express-validator");

// Get all posts
router.get("/get", blogController.getAll);

// Get by Id
router.get("/get/:id", blogController.getSingle);

// Get Single post
router.get("/getByUserId/:id", blogController.getbyId);

// Insert Post
router.post("/post", blogController.InsertData);

// Delete
router.delete("/delete/:id", blogController.RemoveItem);

// Put
router.put("/update/:id", blogController.UpdateData);

// Export Router
module.exports = router;
