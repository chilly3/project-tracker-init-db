const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DailySchema = new Schema({
  dailyid: { type: String, required: true, unique: true},
});


//Export model
module.exports = mongoose.model('Daily', DailySchema);