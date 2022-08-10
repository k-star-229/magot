const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      connectDB = require('./config/db'),
      router = require('./routes/api/router');

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Connect Database
// connectDB();

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));