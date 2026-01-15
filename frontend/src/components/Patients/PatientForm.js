import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

const PatientForm = ({ onSubmit, editingPatient }) => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });

  useEffect(() => {
    if (editingPatient) setForm(editingPatient);
  }, [editingPatient]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', age: '', gender: '', contact: '' });
  };

  const handleClear = () => {
    setForm({ name: '', age: '', gender: '', contact: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        {editingPatient ? '✏️ Edit Patient' : '➕ Add New Patient'}
      </Typography>
      
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Patient Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
        />
        
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
        />
        
        <TextField
          fullWidth
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
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
            {editingPatient ? 'Update' : 'Add'} Patient
          </Button>
          
          {editingPatient && (
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

export default PatientForm;
