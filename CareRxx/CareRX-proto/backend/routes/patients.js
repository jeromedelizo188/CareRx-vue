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


// GET /api/patients/:id/medical-records - Get patient data and medical records
router.get('/:id/medical-records', async (req, res) => {
  const patientId = req.params.id;

  try {
    // 1. Get patient profile data for the Health Snapshot
    const [patientResult] = await db.execute(
      `SELECT first_name, last_name, blood_type, allergies FROM patients WHERE id = ?`,
      [patientId]
    );
    const patientData = patientResult[0];

    if (!patientData) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    // 2. Get all medical records for the patient
    // NOTE: This assumes a 'medical_records' table exists. Adjust as needed.
    const [recordsResult] = await db.execute(
      `SELECT id, title, date, doctor, facility, type FROM medical_records WHERE patient_id = ? ORDER BY date DESC`,
      [patientId]
    );

    res.json({
      patientData,
      medicalRecords: recordsResult
    });

  } catch (error) {
    console.error('Medical Records data error:', error);
    res.status(500).json({ error: 'Failed to fetch medical records data.', details: error.message });
  }
});

// GET /api/patients/:id/prescriptions - Get patient data and prescriptions
router.get('/:id/prescriptions', async (req, res) => {
  const patientId = req.params.id;

  try {
    // 1. Get patient profile data for display
    const [patientResult] = await db.execute(
      `SELECT first_name FROM patients WHERE id = ?`,
      [patientId]
    );
    const patientData = patientResult[0];

    if (!patientData) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    // 2. Get all prescriptions for the patient
    // NOTE: This assumes a 'prescriptions' table exists. Adjust as needed.
    const [prescriptionsResult] = await db.execute(
      `SELECT id, medication_name, prescribed_date, dosage, doctor_name, status FROM prescriptions WHERE patient_id = ? ORDER BY prescribed_date DESC`,
      [patientId]
    );

    res.json({
      patientData,
      prescriptions: prescriptionsResult
    });

  } catch (error) {
    console.error('Prescriptions data error:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions data.', details: error.message });
  }
});

// GET /api/patients/:id/profile - Get all data for a specific patient's profile
router.get('/:id/profile', async (req, res) => {
  const patientId = req.params.id;

  try {
    // Fetch all relevant patient data in one query
    const [patientResult] = await db.execute(
      `SELECT 
        first_name, 
        last_name, 
        date_of_birth, 
        gender, 
        street_address, 
        city, 
        state, 
        zip_code, 
        blood_type, 
        allergies, 
        current_medications, 
        medical_conditions, 
        emergency_contact_name, 
        emergency_contact_phone, 
        emergency_relationship,
        email, 
        phone,
        created_at
      FROM patients 
      WHERE id = ?`,
      [patientId]
    );
    const patientData = patientResult[0];

    if (!patientData) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    res.json(patientData);

  } catch (error) {
    console.error('Profile data error:', error);
    res.status(500).json({ error: 'Failed to fetch profile data.', details: error.message });
  }
});
module.exports = router;