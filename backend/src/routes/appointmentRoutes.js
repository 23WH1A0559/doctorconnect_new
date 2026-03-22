const express = require('express');
const router = express.Router();

const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// JWT middleware
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');


// Book appointment (Patient only)
router.post(
  '/',
  verifyToken,
  authorizeRoles("patient"),
  bookAppointment
);

// Patient appointments
router.get('/patient/:patientId', getPatientAppointments);

// Doctor appointments (Doctor only)
router.get(
  '/doctor/:doctorId',
  verifyToken,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

// Update appointment status
router.put('/:id', updateAppointmentStatus);

module.exports = router;