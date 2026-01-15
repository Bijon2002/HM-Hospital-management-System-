const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// CREATE
router.post('/', appointmentController.createAppointment);

// READ ALL
router.get('/', appointmentController.getAllAppointments);

// READ SINGLE
router.get('/:id', appointmentController.getAppointmentById);

// UPDATE
router.put('/:id', appointmentController.updateAppointment);

// DELETE
router.delete('/:id', appointmentController.deleteAppointment);

// FILTER
router.get('/filter', appointmentController.filterAppointments);

module.exports = router;
