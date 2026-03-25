const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

// JWT middleware
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

//Doctor adds slots
const { addSlot } = require('../controllers/doctorController');
//get only available slots
const { getAvailableSlots } = require('../controllers/doctorController');

router.get('/:doctorId/slots', getAvailableSlots);

// Get all doctors
router.get('/', getAllDoctors);

// Get doctor by id
router.get('/:id', getDoctorById);

// Create doctor (Admin only)
router.post(
  '/',
  verifyToken,
  authorizeRoles("admin"),
  createDoctor
);

// Update doctor
router.put('/:id', updateDoctor);

// Delete doctor
router.delete('/:id', deleteDoctor);

// Doctor adds slot (only doctor)
router.post(
  '/:doctorId/slots',
  verifyToken,
  authorizeRoles("doctor"),
  addSlot
);

module.exports = router;