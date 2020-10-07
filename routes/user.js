const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userMethods = require("../methods/user-methods");

//* Authentication
// POST: Register
router.post(
  "/register",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  userMethods.register
);

// POST: Login
router.post(
  "/login",
  [
    check("username", "Enter a valid username").notEmpty(),
    check("password", "Enter a valid password").notEmpty(),
  ],
  userMethods.login
);

//* CRUD operations
// Get Blogs
router.get("/allBlogs", userMethods.getBlogs);

// Export Router
module.exports = router;
