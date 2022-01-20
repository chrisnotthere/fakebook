const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, default: 'anon.jpg' },
  about: { type: String, maxlength: 350 },
  //posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // facebookId: { type: String },
});

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

// create a 'fullname' derived from firstname and lastname
UserSchema.virtual('fullname')
  .get(function() {
    return this.firstName + ' ' + this.lastName
  })
  .set(function(newName) {
    const nameParts = newName.split(' ')
    this.firstName = nameParts[0]
    this.lastName = nameParts[1]
  })

// // encrypt password before storage -> this was causing issues
// UserSchema.pre("save", async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

module.exports = mongoose.model("User", UserSchema);
