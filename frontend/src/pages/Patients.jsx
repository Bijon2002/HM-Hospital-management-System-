import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import PatientForm from '../components/Patients/PatientForm';
import PatientList from '../components/Patients/PatientList';
import { getPatients, addPatient, updatePatient, deletePatient } from '../services/patientService';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch patients on load
  const fetchPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add or update patient
  const handleSubmit = async (patientData) => {
    if (editingPatient) {
      await updatePatient(editingPatient._id, patientData);
      setEditingPatient(null);
    } else {
      await addPatient(patientData);
    }
    fetchPatients();
  };

  // Edit click
  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

  // Delete click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deletePatient(id);
      fetchPatients();
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        👥 Manage Patients
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <PatientForm onSubmit={handleSubmit} editingPatient={editingPatient} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <PatientList patients={patients} onEdit={handleEdit} onDelete={handleDelete} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientsPage;
