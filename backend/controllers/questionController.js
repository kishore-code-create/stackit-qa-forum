const Question = require('../models/Question');
const Answer = require('../models/Answer');

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    const question = await Question.create({
      title,
      body,
      tags,
      user: req.user._id
    });

    const populatedQuestion = await Question.findById(question._id)
      .populate('user', 'username email');

    res.status(201).json({
      message: 'Question created successfully',
      question: populatedQuestion
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('user', 'username email')
      .populate('acceptedAnswer')
      .sort({ createdAt: -1 });

    res.json({
      questions,
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single question
const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('user', 'username email')
      .populate('acceptedAnswer');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user owns the question
    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this question' });
    }

    // Delete associated answers
    await Answer.deleteMany({ question: question._id });

    await Question.findByIdAndDelete(req.params.id);

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestion,
  deleteQuestion
};