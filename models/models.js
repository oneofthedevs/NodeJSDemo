const mongoose = require("mongoose");

// userId: {
//   type: String,
//   required: true,
// },
const userSchemma = mongoose.Schema({
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
});

const postSchemma = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  smallDesc: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [],
});

const user = mongoose.model("User", userSchemma);
const post = mongoose.model("Post", postSchemma);
module.exports = {
  user,
  post,
};
