const async = require('async');
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

let wakatime_api = require('../config/waka.config');
let app = express();
let port = 8000;

//Models
const User = require('./models/user');
const Daily = require('./models/daily');

//Routes
const user_routes = require('./routes/user');
const daily_routes = require('./routes/daily');

app.use('/db/user', user_routes);
app.use('/db/daily', daily_routes);

const mongoDB = require('../config/mongo.config');
mongoose.connect(mongoDB, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});