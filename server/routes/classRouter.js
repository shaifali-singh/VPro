const express = require('express');
const router = express.Router();
const {createClass, joinClass,getClassById, getAllCreatedClass, getAllEnrolledClass} = require('../controllers/classController');
const {protect} = require('../middleware/authMiddleware');



router.route('/create').post(protect, createClass);

router.route('/join').post(protect,joinClass);

router.route('/:id').get(protect,getClassById);

router.route('/myClass/:id').get(protect, getAllCreatedClass)

router.route('/enrolledClass/:id').get(protect, getAllEnrolledClass)


module.exports= router;