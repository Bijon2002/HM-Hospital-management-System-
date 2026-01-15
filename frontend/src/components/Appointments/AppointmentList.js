import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AppointmentList = ({ appointments, onEdit, onDelete, patients, doctors }) => {
  const getName = (data) => {
    // If data is already an object with name (from populated backend), return the name
    if (typeof data === 'object' && data?.name) {
      return data.name;
    }
    // Otherwise return Unknown
    return 'Unknown';
  };

  if (appointments.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="textSecondary">No appointments scheduled yet. Create one to get started!</Typography>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: 'info',
      Completed: 'success',
      Cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((a) => (
            <TableRow key={a._id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
              <TableCell>{getName(a.patient)}</TableCell>
              <TableCell>{getName(a.doctor)}</TableCell>
              <TableCell>{new Date(a.date).toLocaleString()}</TableCell>
              <TableCell>{a.reason}</TableCell>
              <TableCell align="center">
                <Chip
                  label={a.status}
                  color={getStatusColor(a.status)}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(a)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(a._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentList;
