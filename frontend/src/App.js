import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Box, Container, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import NavMenu from './components/NavMenu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <AppBar position="static" sx={{ boxShadow: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
                🏥 HMS
              </Typography>
            </Box>
            <NavMenu />
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={logout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 1,
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      )}

      {isAuthenticated && <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Container>}

      {!isAuthenticated && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
