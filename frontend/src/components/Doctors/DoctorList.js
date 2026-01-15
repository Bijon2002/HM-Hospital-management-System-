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

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  if (doctors.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="textSecondary">No doctors found. Add one to get started!</Typography>
      </Box>
    );
  }

  const getSpecializationColor = (spec) => {
    const colors = {
      Cardiology: 'error',
      Neurology: 'warning',
      Orthopedics: 'info',
      'General Practice': 'success',
      Pediatrics: 'primary',
      Dentistry: 'secondary',
    };
    return colors[spec] || 'default';
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Specialization</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((d) => (
            <TableRow key={d._id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
              <TableCell>{d.name}</TableCell>
              <TableCell align="center">
                <Chip
                  label={d.specialization}
                  color={getSpecializationColor(d.specialization)}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">{d.contact}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(d)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(d._id)}
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

export default DoctorList;
