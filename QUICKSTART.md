# 🚀 Quick Start Guide

## Get Started in 5 Minutes

### 1. Login
```
Email: admin@gmail.com
Password: admin123
```

### 2. Navigate to Dashboard
- View real-time statistics
- See interactive charts
- Check hospital overview

### 3. Manage Data
- **Patients**: Add/edit/delete patient records
- **Doctors**: Manage doctor profiles
- **Appointments**: Schedule appointments

### 4. Export Data
- Click "Export to Excel" on dashboard
- Download hospital data in Excel format

---

## Dashboard Overview

### What You'll See
✅ Total Patients Count  
✅ Total Doctors Count  
✅ Total Appointments Count  
✅ Completed Appointments Count  

### Charts Included
📊 Appointment Status Distribution  
👥 Patient Gender Distribution  
📈 Patient Age Range Analysis  
🏥 Doctors by Specialization  

### Live Ticker
See key metrics scrolling at the top in real-time

---

## Common Tasks

### Add a New Patient
1. Click "Patients" in navigation
2. Fill in name, age, gender, contact
3. Click "Add Patient"
4. ✅ Patient added successfully

### Schedule an Appointment
1. Click "Appointments"
2. Select patient and doctor
3. Pick date and time
4. Enter reason
5. Click "Schedule Appointment"
6. ✅ Appointment created

### Export to Excel
1. Go to Dashboard
2. Click "Export to Excel" button
3. ✅ File downloads automatically
4. Open in Excel or Google Sheets

---

## Features

| Feature | Location | Action |
|---------|----------|--------|
| View Dashboard | Home | Auto-opens after login |
| Manage Patients | Left Menu | Add/Edit/Delete |
| Manage Doctors | Left Menu | Add/Edit/Delete |
| Schedule Appointments | Left Menu | Add/Edit/Delete |
| Export Data | Dashboard | Click Export Button |
| View Charts | Dashboard | Scroll down |
| Logout | Top Right | Click Logout |

---

## Tips & Tricks

💡 **Dashboard charts update automatically** - No refresh needed  
💡 **Export includes all data** - Three sheets: Patients, Doctors, Appointments  
💡 **Search your data** - Use browser Ctrl+F to find records  
💡 **Mobile friendly** - Works on tablets and phones  
💡 **Data persists** - Your login session stays active  

---

## Troubleshooting

### Can't Login?
- Double-check credentials
- Make sure backend is running
- Clear browser cache

### Dashboard Empty?
- Add some patients, doctors, appointments first
- Refresh the page
- Check MongoDB connection

### Excel Export Empty?
- Make sure data exists in system
- Refresh dashboard
- Check browser download folder

---

## Default Admin Account

```
Username (Email): admin@gmail.com
Password: admin123
```

⚠️ **Note**: Change these credentials for production use

---

## Backend Requirements

Make sure MongoDB is running:
```bash
# Start MongoDB
mongod
```

Start the backend server:
```bash
cd backend
npm start
```

Server will run on: `http://localhost:5000`

---

## Frontend URL

After starting frontend:
- **Port 3001**: http://localhost:3001
- **Port 3002+**: If port taken, auto-assigns next available port

---

## Need Help?

1. Check the full **README.md** for detailed documentation
2. Look at **FEATURES.md** for feature list
3. Check browser console for error messages
4. Ensure backend is running and connected to MongoDB

---

**Happy Managing! 🏥**
