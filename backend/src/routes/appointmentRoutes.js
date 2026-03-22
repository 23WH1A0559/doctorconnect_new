const express = require('express');
const router = express.Router();

const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');


// Book appointment
router.post('/', bookAppointment);

// Patient appointments
router.get('/patient/:patientId', getPatientAppointments);

// Doctor appointments
router.get('/doctor/:doctorId', getDoctorAppointments);

// Update status
router.put('/:id', updateAppointmentStatus);

module.exports = router;

