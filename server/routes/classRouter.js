const express = require('express');
const router = express.Router();
const {createClass, joinClass,getClassById, getAllCreatedClass, getAllEnrolledClass, getClassLeaderboard} = require('../controllers/classController');
const {protect} = require('../middleware/authMiddleware');



router.route('/create').post(protect, createClass);

router.route('/join').post(protect,joinClass);

router.route('/:id').get(protect,getClassById);

router.route('/myClass/:id').get(protect, getAllCreatedClass)

router.route('/enrolledClass/:id').get(protect, getAllEnrolledClass)

router.route('/leaderboard/:id').get(protect, getClassLeaderboard)

module.exports= router;