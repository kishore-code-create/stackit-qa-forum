const express = require('express');
const {
  createQuestion,
  getAllQuestions,
  getQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/questions
router.post('/', auth, createQuestion);

// GET /api/questions
router.get('/', getAllQuestions);

// GET /api/questions/:id
router.get('/:id', getQuestion);

// DELETE /api/questions/:id
router.delete('/:id', auth, deleteQuestion);

module.exports = router;