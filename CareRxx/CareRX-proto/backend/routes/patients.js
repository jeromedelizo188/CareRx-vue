const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/patients/:id/dashboard - Get all data for a specific patient's dashboard
router.get('/:id/dashboard', async (req, res) => {
  // Get patient ID from URL parameters
  const patientId = req.params.id;

  try {
    // 1. Get patient profile data
    const [patientDataResult] = await db.execute(
      `SELECT first_name, last_name, blood_type, allergies FROM patients WHERE id = ?`,
      [patientId]
    );
    const patientData = patientDataResult[0];

    if (!patientData) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    // 2. Get upcoming appointments
    const [upcomingAppointments] = await db.execute(
      `SELECT c.id, c.consultation_date, d.first_name, d.specialization
       FROM consultations c
       JOIN doctors d ON c.doctor_id = d.id
       WHERE c.patient_id = ? AND c.status = 'scheduled'
       ORDER BY c.consultation_date ASC
       LIMIT 3`,
      [patientId]
    );

    // 3. Get recent consultations (activity)
    const [recentConsultations] = await db.execute(
      `SELECT c.consultation_date, d.first_name, d.specialization, c.notes
       FROM consultations c
       JOIN doctors d ON c.doctor_id = d.id
       WHERE c.patient_id = ? AND c.status = 'completed'
       ORDER BY c.consultation_date DESC
       LIMIT 5`,
      [patientId]
    );

    res.json({
      patientData,
      upcomingAppointments,
      recentConsultations,
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data.', details: error.message });
  }
});

module.exports = router;