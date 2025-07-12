const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Answer content is required'],
    trim: true,
    maxlength: [5000, 'Answer cannot exceed 5000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  isAccepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);