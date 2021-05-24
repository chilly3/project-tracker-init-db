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

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});