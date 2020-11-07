const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  todo: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Posts', PostSchema);
