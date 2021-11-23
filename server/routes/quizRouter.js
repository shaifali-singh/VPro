const express = require('express');
const router = express.Router();
const {createQuiz} = require('../controllers/quizController');
const {protect} = require('../middleware/authMiddleware');



router.route('/create').post(protect, createQuiz);


module.exports= router;