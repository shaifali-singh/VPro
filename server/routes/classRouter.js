const express = require('express');
const router = express.Router();
const {createClass, joinClass} = require('../controllers/classController');
const {protect} = require('../middleware/authMiddleware');



router.route('/create').post(protect, createClass);

router.route('/join').post(protect,joinClass);

// router.route('/:id').get(protect,getClassById);


module.exports= router;