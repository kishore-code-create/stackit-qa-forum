const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Question title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  body: {
    type: String,
    required: [true, 'Question body is required'],
    trim: true,
    maxlength: [5000, 'Question body cannot exceed 5000 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);