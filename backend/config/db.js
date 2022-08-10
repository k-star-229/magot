const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err) {
    return res.status(500).send('Server Error - MongoDB Failed');

    process.exit(1);
  }
};

module.exports = connectDB;