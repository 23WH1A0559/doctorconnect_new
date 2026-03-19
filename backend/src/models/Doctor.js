const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  specialization: String,
  experience: Number,
  availableSlots: Array
});

module.exports = mongoose.model('Doctor', doctorSchema);
