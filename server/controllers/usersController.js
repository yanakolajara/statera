const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

// Get all users
router.get('/', async (req, res) => {
  try {
    const data = await db.manyOrNone('SELECT * FROM users');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by user_id
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [
      userId,
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { id, first_name, middle_name, last_name, dob, gender, email, phone } =
    req.body;
  try {
    const data = await db.one(
      'INSERT INTO users (id, first_name, middle_name, last_name, dob, gender, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [id, first_name, middle_name, last_name, dob, gender, email, phone]
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user by user_id
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { first_name, middle_name, last_name, dob, gender, email, phone } =
    req.body;

  try {
    const data = await db.one(
      'UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, dob = $4, gender = $5, email = $6, phone = $7 WHERE id = $8 RETURNING *',
      [first_name, middle_name, last_name, dob, gender, email, phone, userId]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by user_id
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await db.none('DELETE FROM users WHERE id = $1', [userId]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
