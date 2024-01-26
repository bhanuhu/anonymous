const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

const replySchema = new mongoose.Schema({
  name: String,
  comment: String,
  replyTo: String,
});

const postschema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  comment: [commentSchema],
  reply: [replySchema],
});

const Post = mongoose.model("Post", postschema);

module.exports = Post;
