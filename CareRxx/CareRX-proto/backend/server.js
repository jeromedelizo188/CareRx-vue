const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.url}`);
  next();
});

// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend's origin
  credentials: true // Allow cookies if you use them later
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT 1 as test');
    res.json({ 
      message: 'Database connected successfully!', 
      result: rows[0] 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      details: error.message 
    });
  }
});

// API Routes
const doctorRoutes = require('./routes/doctors'); // Require the new doctor routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', doctorRoutes); // Use the new doctor routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});