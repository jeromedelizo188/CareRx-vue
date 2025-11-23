const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/doctors - Get all available doctors
router.get('/', async (req, res) => {
    try {
        const [doctors] = await db.execute(
            `SELECT id, first_name, last_name, specialization, years_of_experience FROM doctors WHERE account_status = 'active'`
        );
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors.', details: error.message });
    }
});

// GET /api/doctors/:id/availability - Get availability for a specific doctor
router.get('/:id/availability', async (req, res) => {
    const doctorId = req.params.id;
    // This is a placeholder. A real implementation would be more complex.
    // It would parse a doctor's `availability_schedule` and check against existing `consultations`.
    try {
        console.log(`Fetching availability for Doctor ID: ${doctorId}`);
        // For now, return mock availability
        const availability = {
            '2025-12-20': ['09:00 AM', '10:00 AM', '11:00 AM'],
            '2025-12-21': ['02:00 PM', '03:00 PM']
        };
        res.json(availability);
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ error: 'Failed to fetch availability.', details: error.message });
    }
});

module.exports = router;