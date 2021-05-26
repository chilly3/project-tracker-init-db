const async = require('async');
const bodyParser = require('body-parser');
const express = require('express');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const Daily = require('../models/daily');

const router = express.Router();
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

///DAILY DATABASE ROUTES///

//POST request add dailys
router.post('/add', (req, res, next) => {
  const postDays = req.body.days;

  Daily.insertMany(postDays, (err, docs) => {
    if (err) {
      return console.error(err);
    } else {
      res.status(201).send(postDays)
      console.log(`Multiple documents inserted into Daily collection`)
    }
  })
});

//GET request for list of all dailys
router.get('/list', async (req, res) => {
  const days = await Daily.find();
  return res.status(200).send(days);
});

//GET request for individual daily
router.get('/:id', async (req, res) => {
  console.log(req.params);
  try {
    const day = await Daily.findOne({ _id: req.params.id });
    return res.status(200).send(day);
  } catch {
    res.status(404).send({ error: "Day not listed in the database" })
  }
});


module.exports = router;