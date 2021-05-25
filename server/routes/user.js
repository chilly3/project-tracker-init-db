const async = require('async');
const bodyParser = require('body-parser');
const express = require('express');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const Daily = require('../models/daily');

const router = express.Router();
router.use(bodyParser.json());

///USER DATABASE ROUTES///

//POST request add users
router.post('/add', (req, res, next) => {
  const postUsers = req.body.users;

  User.insertMany(postUsers, (err, docs) => {
    if (err) {
      return console.error(err);
    } else {
      res.status(201).send(postUsers)
      console.log(`Multiple documents inserted into User collection`)
    }
  })
});

//GET request for list of all users
router.get('/list', async (req, res) => {
  const users = await User.find();
  return res.status(200).send(users);
});

//GET request for user info
router.get('/:id', async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).send(user);
  } catch {
    res.status(404).send({ error: "User not listed in the database" })
  }
});


module.exports = router;