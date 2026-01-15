import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

const AppointmentForm = ({ onSubmit, editingAppointment, patients, doctors }) => {
  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    date: '',
    reason: '',
    status: 'Scheduled',
  });

  useEffect(() => {
    if (editingAppointment) {
      const dateObj = editingAppointment.date ? new Date(editingAppointment.date) : new Date();
      const dateStr = dateObj.toISOString().slice(0, 16);
      setForm({ ...editingAppointment, date: dateStr });
    }
  }, [editingAppointment]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ patient: '', doctor: '', date: '', reason: '', status: 'Scheduled' });
  };

  const handleClear = () => {
    setForm({ patient: '', doctor: '', date: '', reason: '', status: 'Scheduled' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        {editingAppointment ? '✏️ Edit Appointment' : '➕ Schedule New Appointment'}
      </Typography>
      
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Select Patient"
          name="patient"
          value={form.patient}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Select Doctor"
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>{d.name} ({d.specialization})</option>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Appointment Date & Time"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          label="Reason for Appointment"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          required
          variant="outlined"
          size="small"
          multiline
          rows={3}
        />

        <TextField
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          variant="outlined"
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </TextField>
        
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            fullWidth
          >
            {editingAppointment ? 'Update' : 'Schedule'} Appointment
          </Button>
          
          {editingAppointment && (
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

export default AppointmentForm;
