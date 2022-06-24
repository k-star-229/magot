const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
// Connect Database
connectDB();

// Init Middleware
app.use(cors());

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

//   // Pass to next layer of middleware
//   next();
// });
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/markets', require('./routes/api/markets'));
app.use('/api/token', require('./routes/api/token'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
