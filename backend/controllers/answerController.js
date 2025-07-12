const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Create a new answer
const createAnswer = async (req, res) => {
  try {
    const { content, questionId } = req.body;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answer = await Answer.create({
      content,
      author: req.user._id,
      question: questionId
    });

    // Add answer to question's answers array
    question.answers.push(answer._id);
    await question.save();

    const populatedAnswer = await Answer.findById(answer._id)
      .populate('author', 'username email');

    res.status(201).json({
      message: 'Answer created successfully',
      answer: populatedAnswer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all answers for a question
const getAnswersForQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      answers,
      count: answers.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept an answer
const acceptAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    const question = await Question.findById(answer.question);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user owns the question
    if (question.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only question author can accept answers' });
    }

    // Unaccept previous accepted answer
    if (question.acceptedAnswer) {
      await Answer.findByIdAndUpdate(question.acceptedAnswer, { isAccepted: false });
    }

    // Accept the new answer
    answer.isAccepted = true;
    await answer.save();

    question.acceptedAnswer = answer._id;
    await question.save();

    res.json({
      message: 'Answer accepted successfully',
      answer
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete answer
const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    // Check if user owns the answer
    if (answer.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this answer' });
    }

    // Remove answer from question's answers array
    await Question.findByIdAndUpdate(answer.question, {
      $pull: { answers: answer._id }
    });

    await Answer.findByIdAndDelete(req.params.answerId);

    res.json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnswer,
  getAnswersForQuestion,
  acceptAnswer,
  deleteAnswer
};