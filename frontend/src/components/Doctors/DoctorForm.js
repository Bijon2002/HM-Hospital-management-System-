import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

const DoctorForm = ({ onSubmit, editingDoctor }) => {
  const [form, setForm] = useState({ name: '', specialization: '', contact: '' });

  useEffect(() => {
    if (editingDoctor) setForm(editingDoctor);
  }, [editingDoctor]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', specialization: '', contact: '' });
  };

  const handleClear = () => {
    setForm({ name: '', specialization: '', contact: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        {editingDoctor ? '✏️ Edit Doctor' : '➕ Add New Doctor'}
      </Typography>
      
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Doctor Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
        />
        
        <TextField
          fullWidth
          label="Specialization"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option value="">Select Specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="General Practice">General Practice</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dentistry">Dentistry</option>
        </TextField>
        
        <TextField
          fullWidth
          label="Contact"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
        />
        
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            fullWidth
          >
            {editingDoctor ? 'Update' : 'Add'} Doctor
          </Button>
          
          {editingDoctor && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              startIcon={<ClearIcon />}
              onClick={handleClear}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default DoctorForm;
