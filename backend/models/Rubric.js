const mongoose = require('mongoose');

const RubricSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  criteria: [{
    name: { type: String, required: true },
    description: String,
    weight: { type: Number, required: true }
  }],
  createdBy: { type: String, default: 'Lecturer' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rubric', RubricSchema);
