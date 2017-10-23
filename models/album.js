const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./song');

const Album = new Schema({
  title: String,
  artist: String,
  released: Number,
  tracks: [Song],
  genre: String,
  cover: String,
});


module.exports = mongoose.model('Album', Album);