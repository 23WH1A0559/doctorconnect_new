const mongoose = require('mongoose');

// Doctor schema stores doctor-specific details
// It references the user who has role = doctor

const doctorSchema = new mongoose.Schema({

  // Reference to the user collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // refers to User model
    required: true
  },

  // Doctor specialization
  specialization: {
    type: String,
    required: true
  },

  // Years of experience
  experience: {
    type: Number,
    required: true
  },

  // Available appointment slots
  availableSlots: [
    {
      date: String,
      time: String,
      isBooked: {
        type: Boolean,
        default: false
      }
    }
  ]

}, { timestamps: true });

// Export model
module.exports = mongoose.model('Doctor', doctorSchema);
