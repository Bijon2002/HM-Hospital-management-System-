const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected 🚀'))
  .catch(err => console.log(err));

// ✅ IMPORT ROUTES CORRECTLY
const patientRoutes = require('./routes/patientRoutes'); // <-- note the relative path
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);


// console.log('TYPE OF patientRoutes:', typeof patientRoutes); // should print 'function'

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
