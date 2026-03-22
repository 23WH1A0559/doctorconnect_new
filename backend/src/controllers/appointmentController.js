const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');


// ================= BOOK APPOINTMENT =================
exports.bookAppointment = async (req, res) => {

  try {
 const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;

    // Check if slot already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: "Booked"
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Slot already booked"
      });
    }

    // Create new appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime
    });

    res.status(201).json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= PATIENT APPOINTMENTS =================
exports.getPatientAppointments = async (req, res) => {

  try {

    const { patientId } = req.params;

    const appointments = await Appointment.find({ patientId })
      .populate('doctorId')
      .populate('patientId', 'name email');

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// =================GET DOCTOR APPOINTMENTS =================
exports.getDoctorAppointments = async (req, res) => {

  try {
 const { doctorId } = req.params;
  const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name email')
      .populate('doctorId');
res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// ================= UPDATE APPOINTMENT STATUS =================
exports.updateAppointmentStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

