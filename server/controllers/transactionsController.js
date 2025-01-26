const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const data = await db.manyOrNone('SELECT * FROM transactions');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by transaction_id
router.get('/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  try {
    const data = await db.oneOrNone(
      'SELECT * FROM transactions WHERE id = $1',
      [transactionId]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get users transactions by user_id
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await db.manyOrNone(
      'SELECT * FROM transactions WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new transaction
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { amount, type, category, description, date } = req.body;
  try {
    const data = await db.one(
      'INSERT INTO transactions (user_id, amount, type, category, description, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, amount, type, category, description, date]
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update transaction by transaction_id
router.put('/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  const { amount, type, category, description, date } = req.body;

  try {
    const data = await db.one(
      'UPDATE transactions SET amount = $1, type = $2, category = $3, description = $4, date = $5 WHERE id = $6 RETURNING *',
      [amount, type, category, description, date, transactionId]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction by transaction_id
router.delete('/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    await db.none('DELETE FROM transactions WHERE id = $1', [transactionId]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
