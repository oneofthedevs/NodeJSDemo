const express = require("express");
const router = express.Router();
const blogMethods = require("../methods/blog-methods");

// Get all posts
router.get("/", blogMethods.getAll);

// Get Single post
router.get("/:id", blogMethods.getSingle);

// Insert Post
router.post("/", blogMethods.InsertData);

// Delete
router.delete("/:id", blogMethods.RemoveItem);

// Put
router.put("/:id", blogMethods.UpdateData);

// Export Router
module.exports = router;
