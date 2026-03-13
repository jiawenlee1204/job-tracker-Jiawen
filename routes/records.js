const express = require('express');
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const { status, search, sortBy = 'date-desc' } = req.query;

  try {
    let records = db.records.findByUserId(userId);

    if (status && status !== 'all') {
      records = records.filter(r => r.status === status);
    }

    if (search) {
      records = records.filter(r => 
        r.company.toLowerCase().includes(search.toLowerCase()) ||
        r.position.toLowerCase().includes(search.toLowerCase())
      );
    }

    const sortMap = {
      'date-desc': (a, b) => new Date(b.date) - new Date(a.date),
      'date-asc': (a, b) => new Date(a.date) - new Date(b.date),
      'company-asc': (a, b) => a.company.localeCompare(b.company),
      'company-desc': (a, b) => b.company.localeCompare(a.company)
    };

    const sortFn = sortMap[sortBy] || sortMap['date-desc'];
    records.sort(sortFn);

    res.json(records);
  } catch (err) {
    console.error('Get records error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const { company, position, status, date, notes, stages, emoji } = req.body;

  if (!company || !position || !status || !date) {
    return res.status(400).json({ error: 'Company, position, status, and date are required' });
  }

  try {
    const newRecord = db.records.create({ 
      user_id: userId, 
      company, 
      position, 
      status, 
      date, 
      notes,
      stages: stages || [],
      emoji: emoji || '🏢'
    });
    res.status(201).json(newRecord);
  } catch (err) {
    console.error('Create record error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.put('/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const recordId = parseInt(req.params.id);
  const { company, position, status, date, notes, stages, emoji } = req.body;

  try {
    const updatedRecord = db.records.update(recordId, userId, { 
      company, 
      position, 
      status, 
      date, 
      notes,
      stages: stages || [],
      emoji: emoji || '🏢'
    });

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(updatedRecord);
  } catch (err) {
    console.error('Update record error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.delete('/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const recordId = parseInt(req.params.id);

  try {
    const deleted = db.records.delete(recordId, userId);

    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error('Delete record error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/stats', authenticateToken, (req, res) => {
  const userId = req.user.userId;

  try {
    const stats = db.records.getStats(userId);
    res.json(stats);
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
