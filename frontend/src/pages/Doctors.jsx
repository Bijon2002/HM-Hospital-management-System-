import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import DoctorForm from '../components/Doctors/DoctorForm';
import DoctorList from '../components/Doctors/DoctorList';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '../services/doctorService';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Fetch doctors
  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add or update
  const handleSubmit = async (doctorData) => {
    if (editingDoctor) {
      await updateDoctor(editingDoctor._id, doctorData);
      setEditingDoctor(null);
    } else {
      await addDoctor(doctorData);
    }
    fetchDoctors();
  };

  // Edit click
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  // Delete click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoctor(id);
      fetchDoctors();
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        👨‍⚕️ Manage Doctors
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <DoctorForm onSubmit={handleSubmit} editingDoctor={editingDoctor} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <DoctorList doctors={doctors} onEdit={handleEdit} onDelete={handleDelete} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorsPage;
