const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// Helper: convert undefined to null
const n = (v) => (v === undefined ? null : v);

// POST /api/auth/register - Register a new user
router.post('/register', async (req, res) => {
  const { role, firstName, lastName, email, password, ...otherDetails } = req.body;

  if (!role || !firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    let query, params;

    if (role === 'patient') {
      const {
        dateOfBirth,
        gender,
        phone,
        streetAddress,
        city,
        state,
        zipCode,
        emergencyContactName,
        emergencyContactPhone,
        emergencyRelationship,
        // Optional fields extracted to ensure they are available, though they can be null
        middleName, 
        bloodType, 
        allergies, 
        medicalConditions, 
        currentMedications
      } = otherDetails;
      
      // --- FIX 1: Mandatory field validation updated (REQUIRED for NOT NULL columns) ---
      if (!dateOfBirth || !gender || !phone || !streetAddress || !city || !state || !zipCode || !emergencyContactName || !emergencyContactPhone || !emergencyRelationship) {
         return res.status(400).json({ error: 'Missing required patient details (dateOfBirth, gender, phone, streetAddress, city, state, zipCode, emergencyContactName, emergencyContactPhone, emergencyRelationship).' });
      }

      // --- FIX 2: Updated SQL to include all columns required by your schema (19 placeholders) ---
      query = `
        INSERT INTO patients 
        (first_name, middle_name, last_name, email, phone, date_of_birth, gender, 
         street_address, city, state, zip_code, blood_type, allergies, 
         medical_conditions, current_medications, emergency_contact_name, 
         emergency_contact_phone, emergency_relationship, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `; 

      params = [
        firstName,
        n(middleName) || null,
        lastName,
        email,
        phone, // Passed directly (already validated as required)
        dateOfBirth, // Passed directly (already validated as required)
        gender, // Passed directly (already validated as required)
        streetAddress, // Passed directly (already validated as required)
        city, // Passed directly (already validated as required)
        state, // Passed directly (already validated as required)
        zipCode, // Passed directly (already validated as required)
        n(bloodType) || null,
        n(allergies) || null,
        n(medicalConditions) || null,
        n(currentMedications) || null,
        emergencyContactName, // Passed directly (already validated as required)
        emergencyContactPhone, // Passed directly (already validated as required)
        emergencyRelationship, // Passed directly (already validated as required)
        password
      ]; 

    } else if (role === 'doctor') {
      const { phone, specialization, licenseNumber, middleName, yearsOfExperience, clinicAddress, availabilitySchedule, gender, dateOfBirth } = otherDetails;
      
      // --- Doctor Validation ---
      if (!phone || !specialization || !licenseNumber) {
         return res.status(400).json({ error: 'Missing required doctor details (phone, specialization, licenseNumber).' });
      }

      // --- Doctor Fix: Updated SQL to include all NOT NULL columns from your schema ---
      query = `
        INSERT INTO doctors 
        (first_name, middle_name, last_name, email, phone, specialization, license_number, 
         years_of_experience, clinic_address, availability_schedule, gender, 
         date_of_birth, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `; // 13 placeholders

      params = [
        firstName,
        n(middleName) || null,
        lastName,
        email,
        phone,
        specialization,
        licenseNumber,
        n(yearsOfExperience) || 0,
        n(clinicAddress) || null,
        n(availabilitySchedule) || null,
        n(gender) || null,
        n(dateOfBirth) || null,
        password
      ]; 

    } else if (role === 'staff') {
      const { phone, department, middleName, role: staffRole, dateOfBirth, gender, address, dateHired } = otherDetails;
      
      // --- Staff Validation ---
      if (!phone || !department) { // 'role' (job title) and password are required by your schema
         return res.status(400).json({ error: 'Missing required staff details (phone, department).' });
      }

      // --- Staff Fix: Updated SQL to include all NOT NULL columns from your schema ---
      query = `
        INSERT INTO staff 
        (first_name, middle_name, last_name, email, phone, role, department, 
         date_of_birth, gender, address, date_hired, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `; // 12 placeholders

      params = [
        firstName,
        n(middleName) || null,
        lastName,
        email,
        phone,
        n(staffRole) || 'other', // staff 'role' defaults to 'other'
        department,
        n(dateOfBirth) || null,
        n(gender) || null,
        n(address) || null,
        n(dateHired) || null,
        password
      ];
      
    } else {
      return res.status(400).json({ error: 'Invalid role specified.' });
    }

    const [result] = await db.execute(query, params);

    res.status(201).json({
      message: 'User registered successfully!',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'An error occurred during registration.',
      details: error.message
    });
  }
});

// POST /api/auth/login - Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    let user = null;
    let role = '';
    
    // Check patients table
    const [patients] = await db.execute(
      'SELECT id, first_name, email, password FROM patients WHERE email = ?',
      [email]
    );
    if (patients.length) { user = patients[0]; role = 'patient'; }

    // Check doctors table
    if (!user) {
      const [doctors] = await db.execute(
        'SELECT id, first_name, email, password FROM doctors WHERE email = ?',
        [email]
      );
      if (doctors.length) { user = doctors[0]; role = 'doctor'; }
    }
    
    // Check staff table (Fix for missing login check)
    if (!user) {
      const [staff] = await db.execute(
        'SELECT id, first_name, email, password FROM staff WHERE email = ?',
        [email]
      );
      if (staff.length) { user = staff[0]; role = 'staff'; }
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    
    res.json({
      message: 'Login successful!',
      user: { id: user.id, name: user.first_name, role }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'An error occurred during login.',
      details: error.message
    });
  }
});

module.exports = router;