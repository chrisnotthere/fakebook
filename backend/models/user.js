const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, default: 'https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png' },
  coverPicture: { type: String, default: 'https://media.istockphoto.com/photos/background-of-galaxy-and-stars-picture-id1035676256?k=20&m=1035676256&s=612x612&w=0&h=Dnu8uhnGg1ZgzaEduBnTI-ixFAM-XU-whKQqAsjYnGs=' },
  about: { type: String, maxlength: 350 },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  facebookId: { type: String },
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

// // encrypt password before storage -> this may be causing issues during development
// UserSchema.pre("save", async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
