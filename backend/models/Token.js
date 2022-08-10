const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  social: {
    website: {
      type: String,
      required: true
    },
    telegram: {
      type: String,
      required: true,
    }
  },
  token: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    symbol: {
      type: String
    },
    address: {
      type: String,
      required: true,
      unique: true
    },
    chain: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
  },
  date: {
    type: Date,
    default: Date.now
  },
  isShow: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model('token', TokenSchema);