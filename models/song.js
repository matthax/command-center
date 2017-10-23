const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
  title: String,
  artist: String,
  album: String,
  track: { type: Number, default: 1 },
  genre: String,
  cover: String,
});


module.exports = mongoose.model('Song', Song);