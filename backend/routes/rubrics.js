const express = require('express');
const router = express.Router();
const Rubric = require('../models/Rubric');
const { parseRubricText } = require('../utils/gemini');

// Parse raw text into structured criteria
router.post('/parse', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Raw text is required' });
    const structuredCriteria = await parseRubricText(text);
    res.json(structuredCriteria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all rubrics
router.get('/', async (req, res) => {
  try {
    const rubrics = await Rubric.find().sort({ createdAt: -1 });
    res.json(rubrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new rubric
router.post('/', async (req, res) => {
  try {
    const newRubric = new Rubric(req.body);
    await newRubric.save();
    res.status(201).json(newRubric);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a rubric
router.delete('/:id', async (req, res) => {
  try {
    await Rubric.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rubric deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
