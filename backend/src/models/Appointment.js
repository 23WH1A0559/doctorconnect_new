const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  appointmentDate: String,
  appointmentTime: String,
  status: { type: String, default: "Booked" }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
