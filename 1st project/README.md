# SheetWise - Excel Data Analytics Platform

<div align="center">

![SheetWise Logo](https://img.shields.io/badge/SheetWise-Data%20Analytics-blue?style=for-the-badge)

**A powerful full-stack platform for uploading Excel files, analyzing data, and generating interactive 2D and 3D charts with AI-powered insights.**

</div>

---

## Project Overview

SheetWise is a comprehensive data analytics platform that transforms Excel files into interactive visualizations. Users can upload .xls/.xlsx files, select data columns dynamically, and generate stunning 2D/3D charts with AI-powered insights. The platform features a modern React frontend with Redux state management and a robust Node.js backend with MongoDB integration.

### Key Highlights
- **Drag & Drop File Upload** - Seamless Excel file processing
- **Interactive Charts** - 6 types of 2D charts + 3D visualizations  
- **AI Insights** - Smart data analysis and recommendations
- **User Management** - Secure authentication with admin controls
- **Responsive Design** - Works perfectly on all devices
- **Real-time Updates** - Live chart generation and data processing

---

## Features

### Advanced Chart Generation
- **2D Charts**: Bar, Line, Scatter, Pie, Doughnut, Area charts using Chart.js
- **3D Visualizations**: Interactive 3D charts with mouse controls using Three.js
- **Dynamic Configuration**: Choose X/Y axes from Excel column headers
- **Export Options**: Download charts as high-quality PNG images
- **Real-time Preview**: Instant chart updates as you configure

### Smart File Management
- **Multi-format Support**: Upload .xls and .xlsx files
- **Drag & Drop Interface**: Intuitive file upload experience
- **Upload History**: Track all files with metadata and timestamps
- **Data Parsing**: Automatic Excel parsing with SheetJS/xlsx
- **File Validation**: Security checks and type validation
- **Storage Management**: Organized file system with user isolation

### AI-Powered Insights
- **Statistical Analysis**: Automatic calculation of mean, median, range
- **Data Quality Assessment**: Completeness and accuracy metrics
- **Smart Recommendations**: Chart type suggestions based on data
- **Pattern Recognition**: Identify trends and correlations
- **Outlier Detection**: Highlight unusual data points
- **Custom Insights**: Tailored analysis per chart type

### Enterprise Security
- **JWT Authentication**: Secure token-based user sessions
- **Role-based Access**: User and admin permission levels
- **Data Privacy**: Users can only access their own files
- **Password Encryption**: bcrypt hashing for secure storage
- **Protected Routes**: Middleware-based security on all endpoints
- **CORS Configuration**: Secure cross-origin resource sharing

### Modern User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Dashboard**: Intuitive user interface with real-time updates
- **Loading States**: Better UX with progress indicators
- **Error Handling**: User-friendly error messages and recovery
- **Accessibility**: WCAG compliant design

---

## Technical Stack

### **Frontend Technology**
| Technology | Purpose |
|-----------|---------|
| React | Component-based UI framework |
| Redux Toolkit | State management and data flow |
| Chart.js | 2D chart rendering library |
| Three.js | 3D graphics and visualization |
| Tailwind CSS | Utility-first CSS framework |
| React Router | Client-side routing |
| Axios | HTTP client for API calls |

### **Backend Technology**
| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web application framework |
| MongoDB | NoSQL database with Mongoose ODM |
| Multer | File upload handling middleware |
| SheetJS | Excel file parsing and processing |
| JWT | JSON Web Token authentication |
| bcrypt | Password hashing and encryption |

---

## Prerequisites

Before setting up SheetWise, ensure you have the following installed:

| Requirement | Download Link |
|-------------|---------------|
| **Node.js** | [Download Node.js](https://nodejs.org/) |
| **npm** | Included with Node.js |
| **MongoDB** | [Download MongoDB](https://www.mongodb.com/try/download/community) |
| **Git** | [Download Git](https://git-scm.com/downloads) |

---

## Quick Start Guide

### **Option 1: Automated Setup (Windows)**

1. **Run automated setup:**
   ```batch
   setup.bat
   ```

2. **Start the application:**
   ```batch
   start.bat
   ```

### **Option 2: Manual Setup**

#### **Step 1: Install Dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

#### **Step 2: Setup MongoDB**
```bash
# Start MongoDB (choose one option)

# Option A: MongoDB as Windows Service
net start MongoDB

# Option B: MongoDB manually
mongod

# Option C: MongoDB with custom directory
mongod --dbpath /path/to/data
```

#### **Step 3: Environment Configuration**

Create/Update `.env` file in root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/sheetwise

# Security Configuration (⚠️ CHANGE THESE IN PRODUCTION)
JWT_SECRET=change_this_to_a_secure_random_string_in_production_minimum_32_characters
JWT_EXPIRE=30d

# Admin Configuration
ADMIN_PASSWORD=TempAdmin123!

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### **Step 4: Start the Application**

**Terminal 1 - Backend Server:**
```bash
npm run dev
# Server starts on http://localhost:5000
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm start
# Application opens at http://localhost:3000
```

---

## Usage Guide

### **Getting Started**
1. **Access**: Open http://localhost:3000
2. **Register**: Create a new user account
3. **Login**: Access the dashboard

### **Using the Platform**
1. **Upload Excel File**: Drag & drop or select .xls/.xlsx files
2. **View Parsed Data**: System automatically extracts data
3. **Configure Charts**: Select X/Y axes from your data columns
4. **Generate Visualizations**: Choose 2D or 3D chart types
5. **Get AI Insights**: Receive automated data analysis
6. **Download Charts**: Export as PNG images

### **Available Chart Types**
- **Bar Chart**: Compare categories and values
- **Line Chart**: Show trends over time
- **Scatter Plot**: Analyze correlations
- **Pie Chart**: Display proportional data
- **Doughnut Chart**: Alternative pie chart view
- **Area Chart**: Emphasize magnitude changes
- **3D Charts**: Interactive three-dimensional visualizations

---

## API Documentation

### **Authentication Endpoints**
```http
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
```

### **File Management Endpoints**
```http
POST   /api/files/upload     # Upload Excel file
GET    /api/files            # Get user's files
GET    /api/files/:id        # Get specific file
GET    /api/files/:id/data   # Get file data for charts
DELETE /api/files/:id        # Delete file
```

### **Chart Generation Endpoints**
```http
POST /api/charts/generate     # Generate chart data
POST /api/charts/ai-insights  # Get AI insights
POST /api/charts/download     # Download chart
```

### **User Management (Admin)**
```http
GET    /api/users        # Get all users
GET    /api/users/:id    # Get specific user
PUT    /api/users/:id    # Update user
DELETE /api/users/:id    # Delete user
```

---

## Project Structure

```
SheetWise/
│
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── FileUpload.jsx   # File upload component
│   │   │   ├── FileHistory.jsx  # Upload history display
│   │   │   ├── ChartGenerator.jsx # Chart configuration
│   │   │   ├── Chart2D.jsx      # 2D chart rendering
│   │   │   └── Chart3D.jsx      # 3D chart rendering
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   └── Dashboard.jsx   # Main dashboard
│   │   ├── store/           # Redux store
│   │   │   └── slices/      # Redux slices
│   │   │       ├── authSlice.js    # Authentication state
│   │   │       ├── fileSlice.js    # File management
│   │   │       └── chartSlice.js   # Chart generation
│   │   └── App.js              # Main app component
│   └── package.json            # Frontend dependencies
│
├── src/                     # Backend source code
│   ├── controllers/         # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   ├── fileController.js   # File operations
│   │   ├── userController.js   # User management
│   │   └── chartController.js  # Chart generation
│   ├── models/              # Database models
│   │   ├── userModel.js        # User schema
│   │   ├── fileModel.js        # File schema
│   │   └── dataModel.js        # Data schema
│   ├── routes/              # API routes
│   │   ├── authRoutes.js       # Authentication
│   │   ├── fileRoutes.js       # File management
│   │   ├── userRoutes.js       # User operations
│   │   └── chartRoutes.js      # Chart generation
│   └── server.js               # Express server
│
├── .env                     # Environment variables
├── package.json             # Backend dependencies
├── setup.bat                # Windows setup script
└── start.bat                # Windows start script
```

---

## Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | ✅ |
| `MONGODB_URI` | Database connection string | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `JWT_EXPIRE` | Token expiration | ❌ |
| `ADMIN_PASSWORD` | Default admin password | ✅ |
| `FRONTEND_URL` | Frontend URL for CORS | ❌ |

### **Security Configuration**

**⚠️ IMPORTANT: Change default credentials before deployment!**

Generate secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Troubleshooting

### **Common Issues**

#### **MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service:
```bash
net start MongoDB  # Windows
mongod             # Manual start
```

#### **Port Already in Use**
```
Error: EADDRINUSE: address already in use :::5000
```
**Solution**: Kill process or change port in .env

#### **Frontend Build Errors**
```bash
# Clear cache and reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Key Features Demo

### **Interactive Dashboard**
- Real-time file upload with progress tracking
- Upload history with file metadata
- Chart configuration with live preview
- Responsive design for all devices

### **Chart Capabilities**
- **Chart.js**: Professional 2D charts with animations
- **Three.js**: Interactive 3D visualizations
- **Export**: High-quality PNG downloads
- **Dynamic Data**: Real-time configuration updates

### **AI Analytics Example**
```json
{
  "summary": "Analysis of 150 data points shows average value of 85.6",
  "statistics": {
    "count": 150,
    "average": 85.6,
    "maximum": 120,
    "minimum": 45
  },
  "recommendations": [
    "Consider analyzing seasonal trends",
    "Look for correlation patterns",
    "Check for data outliers"
  ]
}
```

---

## Production Deployment

### **Backend Deployment**
1. **Set production environment variables**
2. **Use PM2 for process management**
3. **Configure reverse proxy (Nginx)**
4. **Set up MongoDB Atlas or cloud database**
5. **Enable HTTPS/SSL**

### **Frontend Deployment**
1. **Build**: `npm run build`
2. **Deploy to**: Netlify, Vercel, AWS S3, or Firebase
3. **Update API URLs** for production

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/name`
5. Open Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

Special thanks to:
- **[Chart.js](https://www.chartjs.org/)** - JavaScript charting library
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[React](https://reactjs.org/)** - UI framework
- **[Express.js](https://expressjs.com/)** - Web framework
- **[MongoDB](https://www.mongodb.com/)** - Database platform
- **[SheetJS](https://sheetjs.com/)** - Spreadsheet parser
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework

---

<div align="center">

**Built with love by the SheetWise Team**

**Star this repository if you found it helpful!**

</div>
