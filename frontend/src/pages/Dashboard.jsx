import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Marquee from 'react-fast-marquee';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import { getPatients } from '../services/patientService';
import { getDoctors } from '../services/doctorService';
import { getAppointments } from '../services/appointmentService';
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [patRes, docRes, appRes] = await Promise.all([
        getPatients(),
        getDoctors(),
        getAppointments(),
      ]);
      setPatients(patRes.data);
      setDoctors(docRes.data);
      setAppointments(appRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Patients sheet
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(patients),
      'Patients'
    );

    // Doctors sheet
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(doctors),
      'Doctors'
    );

    // Appointments sheet with readable dates
    const appointmentsForExport = appointments.map((app) => ({
      ...app,
      date: new Date(app.date).toLocaleString(),
      patientName: typeof app.patient === 'object' ? app.patient.name : app.patient,
      doctorName: typeof app.doctor === 'object' ? app.doctor.name : app.doctor,
    }));
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(appointmentsForExport),
      'Appointments'
    );

    XLSX.writeFile(workbook, 'hospital_data.xlsx');
  };

  const appointmentStats = [
    { name: 'Scheduled', value: appointments.filter((a) => a.status === 'Scheduled').length },
    { name: 'Completed', value: appointments.filter((a) => a.status === 'Completed').length },
    { name: 'Cancelled', value: appointments.filter((a) => a.status === 'Cancelled').length },
  ];

  const genderStats = [
    { name: 'Male', value: patients.filter((p) => p.gender === 'Male').length },
    { name: 'Female', value: patients.filter((p) => p.gender === 'Female').length },
    { name: 'Other', value: patients.filter((p) => p.gender === 'Other').length },
  ];

  const specializationStats = doctors.reduce((acc, doc) => {
    const existing = acc.find((item) => item.name === doc.specialization);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: doc.specialization, value: 1 });
    }
    return acc;
  }, []);

  const ageRangeStats = [
    { range: '0-20', count: patients.filter((p) => p.age < 20).length },
    { range: '20-40', count: patients.filter((p) => p.age >= 20 && p.age < 40).length },
    { range: '40-60', count: patients.filter((p) => p.age >= 40 && p.age < 60).length },
    { range: '60+', count: patients.filter((p) => p.age >= 60).length },
  ];

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          borderRadius: 3,
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          border: `2px solid ${color}20`,
          boxShadow: `0 4px 20px ${color}20`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 30px ${color}30`,
          },
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
              }}
            >
              <Icon sx={{ fontSize: 30, color: '#fff' }} />
            </Box>
            <Box>
              <Typography color="textSecondary" variant="caption">
                {title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: color }}>
                {value}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              📊 Hospital Dashboard
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Complete overview of hospital operations
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={exportToExcel}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              px: 3,
            }}
          >
            Export to Excel
          </Button>
        </Box>
      </motion.div>

      {/* Marquee News */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Paper
          sx={{
            mb: 3,
            p: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            color: '#fff',
            overflow: 'hidden',
          }}
        >
          <Marquee speed={50} gradient={false}>
            <Typography variant="subtitle1" sx={{ mr: 5, fontWeight: '500' }}>
              ✅ Total Patients: {patients.length} | 👨‍⚕️ Total Doctors: {doctors.length} |
              📅 Total Appointments: {appointments.length}
            </Typography>
          </Marquee>
        </Paper>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PeopleIcon}
            title="Total Patients"
            value={patients.length}
            color="#667eea"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={LocalHospitalIcon}
            title="Total Doctors"
            value={doctors.length}
            color="#764ba2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={EventIcon}
            title="Total Appointments"
            value={appointments.length}
            color="#f093fb"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={EventIcon}
            title="Completed"
            value={appointments.filter((a) => a.status === 'Completed').length}
            color="#4facfe"
          />
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Appointment Status Chart */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                📅 Appointment Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={appointmentStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {appointmentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Gender Distribution */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                👥 Patient Gender Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Age Range Distribution */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                📊 Patient Age Range Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageRangeStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#667eea" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>

        {/* Doctor Specialization */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                🏥 Doctors by Specialization
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={specializationStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#764ba2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
