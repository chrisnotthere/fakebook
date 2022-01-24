const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true, maxlength: 1000 },
  // image: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  timestamp: { type: Date, default: Date.now() },  
  image: { type: String },
});

PostSchema.virtual("timeFormated").get(function () {
  return this.timestamp.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: '2-digit',
  });
});

module.exports = mongoose.model("Post", PostSchema);
