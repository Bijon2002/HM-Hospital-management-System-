import React from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';

const NavMenu = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon sx={{ mr: 1 }} /> },
    { label: 'Patients', path: '/patients', icon: <PeopleIcon sx={{ mr: 1 }} /> },
    { label: 'Doctors', path: '/doctors', icon: <LocalHospitalIcon sx={{ mr: 1 }} /> },
    { label: 'Appointments', path: '/appointments', icon: <EventIcon sx={{ mr: 1 }} /> },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          component={RouterLink}
          to={item.path}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 1,
            },
          }}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default NavMenu;
