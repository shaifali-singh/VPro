const express = require('express');
const router = express.Router();
const {createQuiz, getQuizById, evaluateQuiz, allowUserForQuiz} = require('../controllers/quizController');
const {protect} = require('../middleware/authMiddleware');



router.route('/create').post(protect, createQuiz);

router.route('/:id').get(protect, allowUserForQuiz);

router.route('/:id/evaluate').post(protect, evaluateQuiz);

module.exports= router;