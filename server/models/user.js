const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userid: { type: String, required: true, unique: true},
});


//Export model
module.exports = mongoose.model('User', UserSchema);