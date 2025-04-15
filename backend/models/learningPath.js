const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  steps: [
    {
      resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
      },
      status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LearningPath', LearningPathSchema);