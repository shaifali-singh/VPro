const asyncHandler = require('express-async-handler');
var ObjectId = require('mongodb').ObjectID;
const randomstring = require("randomstring");
const Class = require('../models/Class');
const User = require('../models/User');


 //Create a new Class
const createClass = asyncHandler(async (req, res) => {
    const { className } = req.body
  
    const existClass = await Class.findOne({ className })
  
    if (existClass){
        res.status(400);
        throw new Error('Class with same name already exist!')
    }

    const randCode = randomstring.generate(8);
    
    const newClass = await Class.create({
        className,
        classCode: randCode,
        classTeacher: req.user._id
    })

    if(newClass){

        const foundUser = await User.findById(req.user._id);
        await foundUser.createdClass.push(newClass._id);
        foundUser.save();

        console.log(newClass); //testing

        res.status(201).json({
                 _id: newClass._id,
                classCode : newClass.classCode
        })

    }else{
        res.status(400);
        throw new Error('Invalid Class Data')
    }

  }) 

  module.exports={
    createClass
}

 //Join a Class
 const joinClass = asyncHandler(async (req, res) => {
     
    const { classCode } = req.body
    
    const foundClass = await Class.findOne({'classCode': classCode});

        if(String(foundClass.classTeacher)===String(req.user._id)){
            res.status(400);
            throw new Error('You are the Teacher of this class. Cannot Join')
        }

        if(foundClass.enrolledStudents.includes(req.user._id)){
            res.status(400);
            throw new Error('You are already enrolled in this class');
        }

        await foundClass.enrolledStudents.push(req.user._id);
        await foundClass.save();

        const foundUser = await User.findById(req.user._id);
        await foundUser.enrolledClass.push({classId: foundClass._id});
        await foundUser.save();

        // testing
        Class.findById(foundClass._id).then(({enrolledStudents})=>
            console.log(enrolledStudents)
        )
        

        res.status(201).json({
                _id: req.user._id,
                classCode 
        })


})

//GET A CLASS BY ID
const getClassById = asyncHandler(async (req, res)=>{

        const foundClass = await Class.findById(req.params.id);
        if(!foundClass){
            res.status(404);
            throw new Error('Class not found.')
        }

        res.status(200).json(foundClass);

})

//GET ALL CREATED CLASSES
const getAllCreatedClass = asyncHandler(async (req, res) => {
     
        User.findById(req.params.id)
        .populate('createdClass').exec((err, classes)=>{
                res.status(200).json({
                    _id: req.user._id,
                    createdClass : classes.createdClass
                })
        })

})

//GET ALL ENROLLED CLASSES
const getAllEnrolledClass = asyncHandler(async (req, res) => {
     
    User.findById(req.params.id)
    .populate('enrolledClass.classId').exec((err, classes)=>{

            res.status(200).json({
                _id: req.user._id,
                enrolledClass : classes.enrolledClass
            })
    })

})

module.exports={
    createClass,
    joinClass,
    getClassById,
    getAllCreatedClass,
    getAllEnrolledClass
}