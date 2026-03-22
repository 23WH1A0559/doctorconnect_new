const Doctor = require('../models/Doctor');


// ================= CREATE DOCTOR =================
exports.createDoctor = async (req, res) => {
  try {

    // Get doctor data from request body
    const { userId, specialization, experience, availableSlots } = req.body;

    // Create doctor document
    const doctor = await Doctor.create({
      userId,
      specialization,
      experience,
      availableSlots
    });

    res.status(201).json(doctor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL DOCTORS =================
exports.getAllDoctors = async (req, res) => {
  try {

    // Fetch doctors and populate user details
    const doctors = await Doctor.find()
      .populate('userId', 'name email');

    res.status(200).json(doctors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE DOCTOR =================
exports.getDoctorById = async (req, res) => {
  try {

    const { id } = req.params;

    const doctor = await Doctor.findById(id)
      .populate('userId', 'name email');

    if (!doctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE DOCTOR =================
exports.updateDoctor = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(updatedDoctor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE DOCTOR =================
exports.deleteDoctor = async (req, res) => {
  try {

    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

