const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/patients/:id/dashboard - Get all data for a specific patient's dashboard
router.get('/:id/dashboard', async (req, res) => {
    const patientId = req.params.id;

    try {
        const [patientDataResult] = await db.execute(
            `SELECT first_name, last_name, blood_type, allergies FROM patients WHERE id = ?`,
            [patientId]
        );
        const patientData = patientDataResult[0];

        if (!patientData) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        // 2. Get upcoming appointments - CORRECTED: Now FROM consultations TABLE with correct column names
        const [upcomingAppointments] = await db.execute(
            `SELECT c.id, c.consultation_date, d.first_name, d.specialization
             FROM consultations c
             JOIN doctors d ON c.doctor_id = d.id
             WHERE c.patient_id = ? AND c.status = 'scheduled' AND c.consultation_date >= NOW()
             ORDER BY c.consultation_date ASC
             LIMIT 3`,
            [patientId]
        );

        // 3. Get recent consultations (activity) - This was already correct
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
        const [patientResult] = await db.execute(
            `SELECT first_name FROM patients WHERE id = ?`,
            [patientId]
        );

        if (patientResult.length === 0) {
            return res.status(404).json({ error: 'Patient not found.' });
        }
        const patientFirstName = patientResult[0].first_name;

        // 2. CORRECTED: Fetch all consultations for the patient, joined with doctor details
        const [appointmentsResult] = await db.execute(
            `SELECT 
             c.id, 
             c.consultation_date, 
             c.consultation_type, 
             c.status,
             d.first_name AS doctor_first_name,
             d.specialization,
             d.clinic_address
             FROM consultations c
             JOIN doctors d ON c.doctor_id = d.id
             WHERE c.patient_id = ?
             ORDER BY c.consultation_date DESC`,
            [patientId]
        );

        // 3. CORRECTED: Process each consultation to map database status to frontend status
        const processedAppointments = appointmentsResult.map(apt => {
            let finalStatus = apt.status; // Use 'status' from consultations table
            const consultationDate = new Date(apt.consultation_date); // Use 'consultation_date'

            if (finalStatus !== 'cancelled' && consultationDate < currentDateTime) {
                finalStatus = 'past';
            }
            
            // If status is 'scheduled' and in the future, it's 'upcoming'
            if (finalStatus === 'scheduled' && consultationDate >= currentDateTime) {
                finalStatus = 'upcoming';
            }

            return {
                id: apt.id,
                title: apt.specialization || 'Consultation',
                doctor: `Dr. ${apt.doctor_first_name}`,
                date: apt.consultation_date,
                location: apt.consultation_type === 'in-person' ? apt.clinic_address : 'Video Call', 
                type: apt.consultation_type,
                status: finalStatus, 
                meeting_url: apt.consultation_type === 'video' ? '#' : null // Placeholder for meeting link
            };
        });

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
// WARNING: This will fail because the 'medical_records' table is not in your database schema.
router.get('/:id/medical-records', async (req, res) => {
    const patientId = req.params.id;

    try {
        const [patientResult] = await db.execute(
            `SELECT first_name, last_name, blood_type, allergies FROM patients WHERE id = ?`,
            [patientId]
        );
        const patientData = patientResult[0];

        if (!patientData) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        // This query will fail because the 'medical_records' table does not exist.
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
// WARNING: This will fail because the 'prescriptions' table is not in your database schema.
router.get('/:id/prescriptions', async (req, res) => {
    const patientId = req.params.id;

    try {
        const [patientResult] = await db.execute(
            `SELECT first_name FROM patients WHERE id = ?`,
            [patientId]
        );
        const patientData = patientResult[0];

        if (!patientData) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        // This query will fail because the 'prescriptions' table does not exist.
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

router.post('/:id/consultations', async (req, res) => {
    const patientId = req.params.id;
    const { doctor_id, consultation_type, consultation_date, notes } = req.body;

    try {
        if (!doctor_id || !consultation_date) {
            return res.status(400).json({ error: 'Doctor ID and Consultation Date are required.' });
        }

        const [result] = await db.execute(
            `INSERT INTO consultations (patient_id, doctor_id, consultation_type, consultation_date, notes, status) VALUES (?, ?, ?, ?, ?, 'scheduled')`,
            [patientId, doctor_id, consultation_type, consultation_date, notes]
        );

        res.status(201).json({ 
            message: 'Consultation created successfully.',
            consultationId: result.insertId
        });

    } catch (error) {
        console.error('Error creating consultation:', error);
        res.status(500).json({ error: 'Failed to create consultation.', details: error.message });
    }
});

module.exports = router;