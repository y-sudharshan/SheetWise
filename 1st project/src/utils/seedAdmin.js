const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');

// Load environment variables
dotenv.config({ path: '../.env' });

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zidio')
  .then(() => {
    console.log('MongoDB Connected');
    seedAdmin();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Create a seed admin user
const seedAdmin = async () => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@zidio.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Hash password
    const adminPassword = process.env.ADMIN_PASSWORD || 'TempAdmin123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@zidio.com',
      password: hashedPassword,
      isAdmin: true
    });
    
    console.log('Admin user created:');
    console.log({
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Admin seed error:', error);
    process.exit(1);
  }
};
