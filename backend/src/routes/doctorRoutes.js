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

module.exports = router;