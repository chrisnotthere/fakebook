const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true, maxlength: 250 },
  //post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  timestamp: { type: Date, default: Date.now() },  
});

CommentSchema.virtual("timeFormated").get(function () {
  return this.timestamp.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: '2-digit',
  });
});

module.exports = mongoose.model("Comment", CommentSchema);
