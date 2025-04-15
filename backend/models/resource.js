const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['course', 'video', 'article'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  prerequisites: [String], // e.g., ["Python:beginner"]
  url: String
}, {timestamps: true});

module.exports = mongoose.model('Resource', ResourceSchema);