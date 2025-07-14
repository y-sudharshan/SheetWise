#  Data Analytics Platform

A robust, scalable Node.js backend application designed for data analytics and Excel file processing. This platform enables users to upload, process, and analyze Excel files with secure authentication and role-based access control.

##  Overview

The Zidio Data Analytics Platform is a comprehensive backend solution that transforms raw Excel data into structured, queryable information. Built with modern technologies and best practices, it provides a secure foundation for data-driven applications.

##  Key Features
###  Security & Authentication
- **JWT-based Authentication** - Secure token-based user authentication
- **Role-based Access Control** - Separate permissions for users and administrators
- **bcrypt Password Hashing** - Industry-standard password encryption
- **Protected Routes** - Middleware-based route protection

###  File Management
- **Excel File Upload** - Support for .xls and .xlsx formats
- **Automated Data Extraction** - Converts Excel sheets to structured JSON
- **File Metadata Storage** - Tracks upload dates, file sizes, and user ownership
- **Secure File Storage** - Organized file system with user-specific naming

###  Data Processing
- **Multi-sheet Support** - Processes all sheets within Excel files
- **Structured Data Storage** - Converts tabular data to MongoDB documents
- **Data Validation** - Ensures data integrity during processing
- **Error Handling** - Comprehensive error management and recovery

###  User Management
- **User Registration & Login** - Self-service account management
- **Profile Management** - Update user information and passwords
- **Admin Dashboard** - Administrative user management capabilities
- **Data Isolation** - Users can only access their own data

## Technology Stack

### **Backend Framework**
- **Node.js** - Runtime environment for JavaScript
- **Express.js** - Fast, unopinionated web framework

### **Database**
- **MongoDB** - NoSQL document database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js

### **Authentication & Security**
- **JSON Web Tokens (JWT)** - Stateless authentication mechanism
- **bcrypt** - Password hashing and salting library
- **dotenv** - Environment variable management

### **File Processing**
- **Multer** - Node.js middleware for handling multipart/form-data
- **SheetJS (xlsx)** - Excel file parsing and data extraction library

### **Development Tools**
- **Nodemon** - Automatic server restart during development
- **npm** - Package manager and script runner

##  Project Architecture

```
zidio/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── fileController.js     # File upload and processing
│   │   └── userController.js     # User management
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification and protection
│   │   └── errorMiddleware.js    # Global error handling
│   ├── models/
│   │   ├── userModel.js          # User schema and methods
│   │   ├── fileModel.js          # File metadata schema
│   │   └── dataModel.js          # Extracted data schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── fileRoutes.js         # File management endpoints
│   │   └── userRoutes.js         # User management endpoints
│   ├── uploads/                  # File storage directory
│   ├── utils/
│   │   ├── generateToken.js      # JWT token utilities
│   │   ├── fileHelper.js         # File processing utilities
│   │   └── seedAdmin.js          # Admin user seeding script
│   └── server.js                 # Application entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

##  Advantages & Benefits

### **Scalability**
- Modular architecture allows easy feature expansion
- NoSQL database supports flexible data structures
- Stateless authentication enables horizontal scaling

### **Security First**
- Industry-standard authentication and authorization
- Encrypted password storage
- Protected file access with user isolation

### **Developer Experience**
- Clean, organized codebase with separation of concerns
- Comprehensive error handling and logging
- Hot-reload development environment

### **Data Processing Excellence**
- Automatic Excel-to-JSON conversion
- Multi-sheet processing capabilities
- Structured data storage for easy querying

### **Production Ready**
- Environment-based configuration
- Error handling middleware
- RESTful API design principles

##  Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   # Edit .env with your actual configuration values
   # Make sure to change JWT_SECRET and ADMIN_PASSWORD to secure values
   ```

4. **Start MongoDB**
   ```bash
   # Ensure MongoDB is running on your system
   mongod
   ```

5. **Seed admin user (optional)**
   ```bash
   npm run seed:admin
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

##  Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zidio
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
JWT_EXPIRE=30d
NODE_ENV=development
ADMIN_PASSWORD=your_secure_admin_password
```

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/profile` | Get user profile | Protected |
| POST | `/api/auth/register/admin` | Register admin | Admin Only |

### File Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/files/upload` | Upload Excel file | Protected |
| GET | `/api/files` | Get user's files | Protected |
| GET | `/api/files/:id` | Get file details | Protected |
| GET | `/api/files/data/:id` | Get extracted data | Protected |
| DELETE | `/api/files/:id` | Delete file | Protected |

### User Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin Only |
| GET | `/api/users/:id` | Get user by ID | Admin Only |
| PUT | `/api/users/profile` | Update own profile | Protected |
| PUT | `/api/users/:id` | Update user | Admin Only |
| DELETE | `/api/users/:id` | Delete user | Admin Only |

## 🔧 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with hot reload
npm run seed:admin # Create initial admin user
npm test          # Run test suite (when implemented)
```

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
.

---

##  Security Considerations

### Environment Variables
- **Never commit `.env` files** to version control
- Change default JWT_SECRET to a secure random string (minimum 32 characters)
- Use a strong admin password when seeding the admin user
- In production, use environment-specific secrets

### JWT Security
- JWT tokens expire after 30 days by default
- Tokens are stateless and cannot be revoked until expiry
- Store tokens securely on the client side

### File Upload Security
- Only .xls and .xlsx files are accepted
- File size is limited to 10MB
- Files are stored with user-specific naming to prevent conflicts
- Users can only access their own uploaded files

### Database Security
- Passwords are hashed using bcrypt with salt rounds
- User queries exclude password fields by default
- MongoDB connection should use authentication in production

### Production Recommendations
- Use HTTPS in production
- Set up proper CORS policies
- Implement rate limiting
- Use a reverse proxy (nginx, Apache)
- Regular security audits and updates
