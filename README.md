# 🏥 Hospital Management System

A modern, feature-rich hospital management system with real-time dashboard, data visualization, and administrative controls.

## 🌟 Features

### Authentication & Security
- **Admin Login** with hardcoded credentials
  - Email: `admin@gmail.com`
  - Password: `admin123`
- Protected routes (unauthenticated users redirected to login)
- Session persistence
- Secure logout

### Dashboard
- 📊 Real-time hospital statistics
- 📈 Interactive charts and graphs
  - Appointment status distribution
  - Patient demographics
  - Doctor specializations
  - Age range analytics
- 📢 Live marquee ticker with key metrics
- 💾 One-click export to Excel

### Management Systems
- **Patients**: Add, edit, delete patient records
- **Doctors**: Manage doctor profiles and specializations
- **Appointments**: Schedule and manage appointments

### User Interface
- Modern gradient design
- Smooth animations and transitions
- Responsive layout (mobile, tablet, desktop)
- Material Design components
- Clean and intuitive navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file or update `config/db.js` with your MongoDB connection string.

Start the backend:
```bash
npm start
# Server runs on http://localhost:5000
```

#### Frontend Setup
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm start
# App opens at http://localhost:3001 (or next available port)
```

## 📱 Usage

### First-Time Login
1. Open the app in browser
2. Enter credentials:
   - **Email**: `admin@gmail.com`
   - **Password**: `admin123`
3. Click **Login**

### Dashboard
- View all hospital statistics
- See interactive charts
- Export data to Excel file

### Patient Management
1. Click "Patients" in navigation
2. **Add**: Fill form and click "Add Patient"
3. **Edit**: Click "Edit" button, modify data, click "Update"
4. **Delete**: Click "Delete" button

### Doctor Management
1. Click "Doctors" in navigation
2. **Add**: Fill form and select specialization
3. **Edit**: Similar to patients
4. **Delete**: Click "Delete" button

### Appointment Management
1. Click "Appointments" in navigation
2. **Schedule**: Select patient, doctor, date/time, reason
3. **Edit**: Modify appointment details
4. **Delete**: Remove appointment

### Export Data
1. Go to Dashboard
2. Click "Export to Excel" button
3. Download will start automatically
4. Excel file contains:
   - Patients sheet
   - Doctors sheet
   - Appointments sheet (with formatted dates)

## 🎨 Color Palette
- **Primary**: #667eea (Blue-Purple)
- **Secondary**: #764ba2 (Purple)
- **Success**: #4facfe (Blue)
- **Warning**: #f093fb (Pink)
- **Background**: #f5f5f5 (Light Gray)

## 📊 Dashboard Charts

### 1. Appointment Status Distribution
Shows breakdown of:
- Scheduled appointments
- Completed appointments
- Cancelled appointments

### 2. Patient Gender Distribution
Pie chart showing:
- Male patients
- Female patients
- Other

### 3. Patient Age Range Distribution
Bar chart showing patient count by age groups:
- 0-20 years
- 20-40 years
- 40-60 years
- 60+ years

### 4. Doctors by Specialization
Bar chart showing doctor count per specialization

## 📁 Project Structure

```
hospital-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── doctorController.js
│   │   └── patientController.js
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Doctor.js
│   │   └── Patient.js
│   ├── routes/
│   │   ├── appointmentRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── patientRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Appointments/
│   │   │   ├── Doctors/
│   │   │   ├── Patients/
│   │   │   └── NavMenu.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Appointments.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Patients.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── appointmentService.js
│   │   │   ├── doctorService.js
│   │   │   └── patientService.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 Technologies Used

### Frontend
- **React** 19+
- **Material-UI (MUI)** - UI components
- **Recharts** - Data visualization
- **Framer-motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation
- **XLSX** - Excel export
- **React Fast Marquee** - Scrolling text

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📈 API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments (with populated data)
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## 🎯 Key Features Explained

### Real-time Data
- Dashboard updates automatically
- Charts reflect database changes instantly
- No page refresh needed

### Protected Routes
- Redirects unauthenticated users to login
- Session maintained until logout
- Data persists in localStorage

### Export Functionality
- Professional Excel export
- Readable date formatting
- Three organized sheets
- All data included

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly buttons
- Optimized layouts

## 🐛 Troubleshooting

### Login not working
- Ensure you're using exact credentials: `admin@gmail.com` / `admin123`
- Check browser console for errors
- Clear localStorage and try again

### Dashboard not loading
- Ensure backend is running on port 5000
- Check MongoDB connection
- Look at network tab in browser console

### Export not working
- Check if data exists in database
- Try refreshing dashboard first
- Check browser's download settings

## 📝 Future Enhancements
- Multi-user support with different roles
- Appointment reminders/notifications
- Patient medical history
- Doctor ratings and reviews
- Billing and payments
- Prescription management
- SMS/Email notifications

## 📄 License
MIT License

## 👨‍💼 Support
For issues or questions, please check the documentation or contact support.

---

**Built with ❤️ for Healthcare Management**
