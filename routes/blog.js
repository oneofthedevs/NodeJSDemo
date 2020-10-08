const express = require("express");
const router = express.Router();
const blogMethods = require("../methods/blog-methods");
const { check } = require("express-validator");

// Get all posts
router.get("/get", blogMethods.getAll);

// Get by Id
router.get("/get/:id", blogMethods.getSingle);

// Get Single post
router.get("/getByUserId/:id", blogMethods.getbyId);

// Insert Post
router.post("/insert", blogMethods.InsertData);

// Delete
router.delete("/remove/:id", blogMethods.RemoveItem);

// Put
router.put("/update/:id", blogMethods.UpdateData);

// Export Router
module.exports = router;
