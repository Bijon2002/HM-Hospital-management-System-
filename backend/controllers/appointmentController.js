const Appointment = require('../models/Appointment');

// ---------------------- CREATE Appointment ----------------------
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ---------------------- GET All Appointments ----------------------
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name age contact')
      .populate('doctor', 'name specialization contact');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------- GET Single Appointment ----------------------
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name age contact')
      .populate('doctor', 'name specialization contact');
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------- UPDATE Appointment ----------------------
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ---------------------- DELETE Appointment ----------------------
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------- FILTER Appointments ----------------------
exports.filterAppointments = async (req, res) => {
  try {
    const { patient, doctor, status, date } = req.query;
    const query = {};
    if (patient) query.patient = patient;
    if (doctor) query.doctor = doctor;
    if (status) query.status = status;
    if (date) query.date = date;

    const appointments = await Appointment.find(query)
      .populate('patient', 'name age contact')
      .populate('doctor', 'name specialization contact');

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
