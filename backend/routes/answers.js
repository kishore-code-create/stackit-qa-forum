const express = require('express');
const {
  createAnswer,
  getAnswersForQuestion,
  acceptAnswer,
  deleteAnswer
} = require('../controllers/answerController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/answers
router.post('/', auth, createAnswer);

// GET /api/answers/:questionId
router.get('/:questionId', getAnswersForQuestion);

// PUT /api/answers/accept/:answerId
router.put('/accept/:answerId', auth, acceptAnswer);

// DELETE /api/answers/:answerId
router.delete('/:answerId', auth, deleteAnswer);

module.exports = router;