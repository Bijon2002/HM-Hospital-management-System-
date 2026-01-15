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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientList = ({ patients, onEdit, onDelete }) => {
  if (patients.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="textSecondary">No patients found. Add one to get started!</Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Gender</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Contact</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((p) => (
            <TableRow key={p._id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
              <TableCell>{p.name}</TableCell>
              <TableCell align="center">{p.age}</TableCell>
              <TableCell align="center">{p.gender}</TableCell>
              <TableCell align="center">{p.contact}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(p._id)}
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

export default PatientList;
