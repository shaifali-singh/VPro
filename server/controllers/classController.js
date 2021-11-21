const asyncHandler = require('express-async-handler');
var ObjectId = require('mongodb').ObjectID;
const randomstring = require("randomstring");
const Class = require('../models/Class');

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
  
    const foundClass = await Class.findOne({'classCode':classCode});
  
    if (!foundClass){
        res.status(404);
        throw new Error('Invalid Class Code')
    }

    else{
        
        if(String(foundClass.classTeacher)===String(req.user._id)){
            res.status(400);
            throw new Error('You are the Teacher of this class. Cannot Join')
        }

        if(foundClass.enrolledStudents.includes(String(req.user._id))){
            res.status(400);
            throw new Error('You are already enrolled in this class');
        }

        else{

            foundClass.enrolledStudents.push(req.user._id);

            console.log(foundClass)
    
            res.status(201).json({
                     _id: req.user._id,
                    classCode 
            })
        }

    }

  }) 

  module.exports={
    createClass,
    joinClass
}