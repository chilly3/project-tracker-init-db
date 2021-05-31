const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { type: String, required: true, unique: true},
  email: { type: String },
  start_date: { type: String },
  total_time: { type: String },
  last_heartbeat_at: { type: String },
  last_editor_used: { type: String },
  last_project: { type: String },
  photo: { type: String }
});


//Export model
module.exports = mongoose.model('User', UserSchema);