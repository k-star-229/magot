const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  membership_type: {
    type: Number,
    default: 0 // not valid-0, monthly-1, annual-2
  },
  membership: {
    type: Number, // free-0, starter-1, premium-2
    default: 0
  },
  expired: {
    type: Date,
    required: true
  },
  history: [
    {
      membership_type: {
        type: Number
      },
      membership: {
        type: Number
      },
      from: {
        type: Date,
        default: Date.now
      },
      to: {
        type: Date
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('user', UserSchema);
