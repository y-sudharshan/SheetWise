# Zidio Data Analytics Platform

A powerful platform for uploading Excel files (.xls or .xlsx), analyzing data, and generating interactive 2D and 3D charts.

## Project Status: ✅ COMPLETE

### ✅ Backend Features (Complete)
- **Node.js & Express.js**: Full server setup
- **JWT Authentication**: User/Admin login system
- **Excel File Upload**: Using Multer middleware
- **Excel Parsing**: Using SheetJS/xlsx library  
- **File Management**: Complete CRUD operations
- **Chart Generation API**: Backend endpoints for chart data
- **AI Insights API**: Simulated AI analysis (ready for OpenAI integration)
- **User Management**: Complete user/admin system
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive middleware

### ✅ Frontend Features (Complete)
- **React.js**: Full application with modern hooks
- **Redux Toolkit**: Complete state management
- **Chart.js**: 2D chart generation (Bar, Line, Scatter, Pie, Doughnut, Area)
- **Three.js**: 3D chart visualization with interactive controls
- **Tailwind CSS**: Modern responsive UI design
- **File Upload Interface**: Drag & drop + file picker
- **Interactive Dashboard**: User-friendly interface
- **Chart Configuration**: Dynamic X/Y axis selection
- **Download Charts**: PNG export functionality
- **User Authentication**: Login/Register pages
- **Upload History**: File management dashboard
- **AI Insights Display**: Analysis results presentation

### ✅ Additional Features
- **Protected Routes**: Authentication-based navigation
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: User-friendly error messages
- **Loading States**: Better UX with loading indicators
- **File Validation**: Excel file type checking
- **Data Processing**: Automatic data parsing and mapping

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **npm** or **yarn**

## Quick Start

### 1. Install Backend Dependencies
```bash
cd "c:\Users\user\Desktop\zidio\1st project"
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Setup Environment Variables

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zidio
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=30d
NODE_ENV=development
ADMIN_PASSWORD=TempAdmin123!
FRONTEND_URL=http://localhost:3000
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000
GENERATE_SOURCEMAP=false
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### 5. Start the Backend Server
```bash
npm run dev
```

### 6. Start the Frontend Development Server
```bash
cd frontend
npm start
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Key Features Demonstrated

### 📊 Excel File Processing
- Upload .xls/.xlsx files via drag & drop or file picker
- Automatic parsing using SheetJS/xlsx
- Data validation and error handling
- File storage and history tracking

### 📈 Chart Generation
- **2D Charts**: Bar, Line, Scatter, Pie, Doughnut, Area
- **3D Charts**: Interactive 3D visualizations using Three.js
- Dynamic X/Y axis selection from Excel columns
- Customizable chart titles and configurations
- Real-time chart updates

### 🔄 Interactive Dashboard
- File upload interface
- Upload history with file management
- Chart configuration panel
- Real-time data visualization
- Downloadable chart exports (PNG)

### 🤖 AI Insights (Simulated)
- Data analysis and statistics
- Automated recommendations
- Data quality assessment
- Chart-specific insights
- Ready for OpenAI API integration

### 🔐 Authentication System
- User registration and login
- JWT-based authentication
- Protected routes and API endpoints
- Admin user management

### 📱 Modern UI/UX
- Responsive design with Tailwind CSS
- Interactive components
- Loading states and error handling
- Clean, professional interface

## Tech Stack

### Frontend
- **React.js** - Component-based UI framework
- **Redux Toolkit** - State management
- **Chart.js** - 2D chart library
- **Three.js** - 3D graphics and visualizations
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Multer** - File upload handling
- **SheetJS/xlsx** - Excel file parsing
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Tools & Utilities
- **Nodemon** - Development server
- **Postman** - API testing
- **Git/GitHub** - Version control

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### File Management
- `POST /api/files/upload` - Upload Excel file
- `GET /api/files` - Get user files
- `GET /api/files/:id` - Get file details
- `GET /api/files/:id/data` - Get file data for charts
- `DELETE /api/files/:id` - Delete file

### Chart Generation
- `POST /api/charts/generate` - Generate chart data
- `POST /api/charts/download` - Download chart
- `POST /api/charts/ai-insights` - Get AI insights

### User Management
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Screenshots & Features

### Dashboard Interface
- Clean, modern design
- File upload with drag & drop
- Chart configuration panel
- Real-time visualization

### Chart Types Supported
- **Bar Charts**: Compare categories
- **Line Charts**: Show trends over time
- **Scatter Plots**: Analyze correlations
- **Pie Charts**: Show proportions
- **Doughnut Charts**: Alternative pie chart view
- **Area Charts**: Filled line charts
- **3D Charts**: Interactive 3D visualizations

### File Management
- Upload history tracking
- File size and date information
- One-click file analysis
- Secure file deletion

## Development Notes

The application is fully functional and ready for production use. Key implementation highlights:

1. **Scalable Architecture**: Modular backend with separated concerns
2. **State Management**: Redux Toolkit for predictable state updates
3. **Error Handling**: Comprehensive error handling on both client and server
4. **Security**: JWT authentication, input validation, file type checking
5. **Performance**: Optimized chart rendering, efficient data processing
6. **User Experience**: Loading states, responsive design, intuitive interface

## Future Enhancements

- OpenAI API integration for real AI insights
- Export to multiple formats (PDF, SVG, etc.)
- Real-time collaboration features
- Advanced statistical analysis
- Data transformation tools
- Chart animation options
- Mobile app development

---

**Created by**: Zidio Development Team  
**License**: MIT  
**Version**: 1.0.0
