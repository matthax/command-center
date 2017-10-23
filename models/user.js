const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  name: {
    first: String,
    last: String,
  },
  phone: String,
  verify_token: String,
  spotify: {
    access_token: String,
    refresh_token: String,
    email: String,
    profile_id: String,
  },
  admin: Boolean,
  permission_level: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);