import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import AppointmentForm from '../components/Appointments/AppointmentForm';
import AppointmentList from '../components/Appointments/AppointmentList';
import { getAppointments, addAppointment, updateAppointment, deleteAppointment } from '../services/appointmentService';
import { getPatients } from '../services/patientService';
import { getDoctors } from '../services/doctorService';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    const appRes = await getAppointments();
    const patRes = await getPatients();
    const docRes = await getDoctors();
    setAppointments(appRes.data);
    setPatients(patRes.data);
    setDoctors(docRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add / Update
  const handleSubmit = async (appointmentData) => {
    if (editingAppointment) {
      await updateAppointment(editingAppointment._id, appointmentData);
      setEditingAppointment(null);
    } else {
      await addAppointment(appointmentData);
    }
    fetchData();
  };

  // Edit
  const handleEdit = (appointment) => setEditingAppointment(appointment);

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteAppointment(id);
      fetchData();
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        📅 Manage Appointments
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <AppointmentForm
              onSubmit={handleSubmit}
              editingAppointment={editingAppointment}
              patients={patients}
              doctors={doctors}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <AppointmentList
              appointments={appointments}
              onEdit={handleEdit}
              onDelete={handleDelete}
              patients={patients}
              doctors={doctors}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentsPage;
