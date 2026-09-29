require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using service role key for backend operations
const supabase = createClient(supabaseUrl, supabaseKey);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Beauty API!' });
});

// Example route to fetch data (e.g., from a 'services' table if you create one)
app.get('/api/health', async (req, res) => {
  try {
    // A simple query to check if the database is reachable
    const { data, error } = await supabase.from('services').select('*').limit(1);
    
    res.json({
      status: 'ok',
      dbConnection: error ? 'error' : 'success',
      message: error ? error.message : 'Database is connected'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVICES ROUTES ---
// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const { data, error } = await supabase.from('services').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- APPOINTMENTS ROUTES ---
// Get appointments
app.get('/api/appointments', async (req, res) => {
  try {
    // Optionally filter by userId: /api/appointments?userId=123
    let query = supabase.from('appointments').select('*');
    if (req.query.userId) {
      query = query.eq('user_id', req.query.userId);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { user_id, service_id, date, time, status, notes } = req.body;
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ user_id, service_id, date, time, status: status || 'pending', notes }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GALLERY ROUTES ---
// Get gallery images
app.get('/api/gallery', async (req, res) => {
  try {
    const { data, error } = await supabase.from('gallery').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- BEAUTICIANS ROUTES ---
app.get('/api/beauticians', async (req, res) => {
  try {
    const { data, error } = await supabase.from('beauticians').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PACKAGES ROUTES ---
app.get('/api/packages', async (req, res) => {
  try {
    const { data, error } = await supabase.from('packages').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FAQS ROUTES ---
app.get('/api/faqs', async (req, res) => {
  try {
    const { data, error } = await supabase.from('faqs').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- TESTIMONIALS ROUTES ---
app.get('/api/testimonials', async (req, res) => {
  try {
    const { data, error } = await supabase.from('testimonials').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
