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




// GET /api/patients/:id/appointments - Get all appointments for a specific patient
router.get('/:id/appointments', async (req, res) => {
  const patientId = req.params.id;
  const currentDateTime = new Date();

  try {
    // 1. First, get the patient's name directly from the patients table
    const [patientResult] = await db.execute(
      `SELECT first_name FROM patients WHERE id = ?`,
      [patientId]
    );

    if (patientResult.length === 0) {
      return res.status(404).json({ error: 'Patient not found.' });
    }
    const patientFirstName = patientResult[0].first_name;

    // 2. Fetch all consultations for the patient, joined with doctor details
    const [appointmentsResult] = await db.execute(
      `SELECT 
        c.id, 
        c.consultation_date, 
        c.consultation_type, 
        c.status, 
        c.notes,
        d.first_name AS doctor_first_name,
        d.specialization,
        d.clinic_address
      FROM consultations c
      JOIN doctors d ON c.doctor_id = d.id
      WHERE c.patient_id = ?
      ORDER BY c.consultation_date DESC`,
      [patientId]
    );

    // 3. Process each appointment to determine its final status and format the data
    const processedAppointments = appointmentsResult.map(apt => {
      let finalStatus = apt.status;
      const consultationDate = new Date(apt.consultation_date);

      // If the appointment is not cancelled and its date has passed, mark it as 'past'
      if (finalStatus !== 'cancelled' && consultationDate < currentDateTime) {
        finalStatus = 'past';
      }
      
      // If the appointment is still scheduled and its date is in the future, mark it as 'upcoming'
      if (finalStatus === 'scheduled' && consultationDate >= currentDateTime) {
        finalStatus = 'upcoming';
      }

      return {
        id: apt.id,
        title: apt.specialization || 'Consultation', // Use specialization as the title
        doctor: `Dr. ${apt.doctor_first_name}`,
        date: apt.consultation_date,
        location: apt.clinic_address || 'TBD', // Use clinic address
        type: apt.consultation_type,
        status: finalStatus, // The calculated status: 'upcoming', 'past', or 'cancelled'
        meeting_url: apt.consultation_type === 'video' ? '#' : null // Placeholder for video link
      };
    });

    // 4. Send the response with the patient's name and the array of appointments
    res.json({
      patient_first_name: patientFirstName,
      appointments: processedAppointments
    });

  } catch (error) {
    console.error('Appointments data error:', error);
    res.status(500).json({ error: 'Failed to fetch appointments data.', details: error.message });
  }
});



// GET /api/patients/:id/consultations - Get all consultations for a specific patient
router.get('/:id/consultations', async (req, res) => {
  const patientId = req.params.id;

  try {
    // Fetch all consultations for the patient, joined with doctor details
    const [consultationsResult] = await db.execute(
      `SELECT 
        c.id, 
        c.consultation_date, 
        c.consultation_type, 
        c.status, 
        c.created_at,
        d.first_name AS doctor_first_name,
        d.specialization
      FROM consultations c
      JOIN doctors d ON c.doctor_id = d.id
      WHERE c.patient_id = ?
      ORDER BY c.created_at DESC`,
      [patientId]
    );

    // Get patient name to send to frontend
    const [patientResult] = await db.execute(
      `SELECT first_name FROM patients WHERE id = ?`,
      [patientId]
    );
    const patientFirstName = patientResult.length > 0 ? patientResult[0].first_name : null;

    res.json({
      patient_first_name: patientFirstName,
      consultations: consultationsResult
    });

  } catch (error) {
    console.error('Consultations data error:', error);
    res.status(500).json({ error: 'Failed to fetch consultations data.', details: error.message });
  }
});
module.exports = router;