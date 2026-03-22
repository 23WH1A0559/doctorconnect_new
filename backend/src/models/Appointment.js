const mongoose = require('mongoose');

// Appointment schema connects patient and doctor

const appointmentSchema = new mongoose.Schema({

  // Reference to patient (from users collection)
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Reference to doctor
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },

  // Date of appointment
  appointmentDate: {
    type: String,
    required: true
  },

  // Time slot
  appointmentTime: {
    type: String,
    required: true
  },

  // Status of appointment
  status: {
    type: String,
    enum: ["Booked", "Completed", "Cancelled"],
    default: "Booked"
  }

}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
