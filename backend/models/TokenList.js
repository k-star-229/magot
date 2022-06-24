const mongoose = require('mongoose');

const TokenListSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true
  },
  telegram: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  chain: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('tokenlist', TokenListSchema);
