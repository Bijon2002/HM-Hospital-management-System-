import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: '#fff',
          top: '-50px',
          left: '-50px',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: '#fff',
          bottom: '-100px',
          right: '-100px',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={20}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <LocalHospitalIcon
                  sx={{
                    fontSize: 60,
                    color: '#667eea',
                    mb: 2,
                  }}
                />
              </motion.div>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Hospital Management System
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Admin Login
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {/* Demo Credentials Info */}
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              <Typography variant="caption" display="block">
                <strong>Demo Credentials:</strong>
              </Typography>
              <Typography variant="caption">Email: admin@gmail.com</Typography>
              <br />
              <Typography variant="caption">Password: admin123</Typography>
            </Alert>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  placeholder="admin@gmail.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  placeholder="••••••••"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  ) : (
                    'Login'
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Footer */}
            <Typography
              variant="caption"
              display="block"
              sx={{ textAlign: 'center', mt: 3, color: 'textSecondary' }}
            >
              Secure Admin Portal
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
