const mongoose = require("mongoose");

// Local schemas
const blog = {
  // Id: {
  //   type: String,
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
    required: true,
  },
  smallDesc: {
    type: String,
    required: false,
    default: "",
  },
};

// Mongoose Schemas
const postSchemma = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userSchemma = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  blogs: [{ ...blog }],
});

const user = mongoose.model("User", userSchemma);
const post = mongoose.model("Post", postSchemma);
module.exports = {
  user,
  post,
};
