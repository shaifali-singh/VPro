const asyncHandler = require('express-async-handler');
var ObjectId = require('mongodb').ObjectID;
const randomstring = require("randomstring");
const Class = require('../models/Class');
const User = require('../models/User');


// CREATE A NEW CLASS
const createClass = asyncHandler(async (req, res) => {
    const { className,classDescription } = req.body
  
    const existClass = await Class.findOne({ className })
  
    if (existClass){
        res.status(400);
        throw new Error('Class with same name already exist!')
    }

    const randCode = randomstring.generate(8);
    
    console.log("Class created", req.user._id)

    const newClass = await Class.create({
        className,
        classDescription,
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

 //JOIN A CLASS
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
                className: foundClass.className 
        })


})

//GET A CLASS BY ID
const getClassById = asyncHandler(async (req, res)=>{

        const foundClass = await Class.findById(req.params.id);
        if(!foundClass){
            res.status(404);
            throw new Error('Class not found.')
        }

        if((String(foundClass.classTeacher)!=String(req.user._id)) && !(foundClass.enrolledStudents.includes(req.user._id))){
            res.status(400)
            throw new Error('You are not enrolled in this class')
        }

        res.status(200).json(foundClass);

})

//GET ALL CLASS OF A USER
const getAllClassOfUser = asyncHandler(async(req, res)=>{

        const {createdClass} = await User.findById(req.params.id).populate('createdClass')

        const {enrolledClass} = await User.findById(req.params.id).populate('enrolledClass.classId')

        let createdClassArray =[]
        let enrolledClassArray = []

        console.log(enrolledClass)
        console.log(createdClass)
        createdClass.forEach(async ({_id, className, enrolledStudents})=>{

            createdClassArray.push({_id, className, numberOfEnrolledStudents: enrolledStudents.length})

        })

        enrolledClass.forEach(async ({classId:{_id, className}, totalScore})=>{

            enrolledClassArray.push({_id,className, totalScore})

        })

        // console.log(createdClassArray);
        // console.log(enrolledClassArray);

        res.status(200).json({
            createdClassArray,
            enrolledClassArray
        })

})

//ADD A TOPIC TO THE CLASS
const addTopic = asyncHandler(async(req, res) =>{


    const {topicName, topicTheory} = req.body
    const foundClass = await Class.findById(req.params.id)

    console.log(req.params.id)

    if(!foundClass){
        res.status(404)
        throw new Error('CLass is not found')
    }

    if(String(req.user._id)!=String(foundClass.classTeacher)){
        res.status(400)
        throw new Error('You are not the class Taecher of this class')

    }

    await foundClass.topics.push({topicName, topicTheory})
    await foundClass.save()

    res.status(200).json({
        message: "Successfully added a new topic to the class"
    })


})

const getClassLeaderboard = asyncHandler(async (req, res) => {

    // Class.findById(req.params.id)
    // .populate({
    //     path: 'enrolledStudents',
    //     model: 'User',
    //     populate: {
    //         path: 'enrolledClass',
    //         model: 'enrolledClassSchema'
    //     }
    // })
    // .exec((err,currentClass) => {
    //     console.log('currentClass');
    //     console.log(currentClass.enrolledStudents);
    // })

    const foundClass = await Class.findById(req.params.id);
    if(!foundClass){
        res.status(404);
        throw new Error('Class not found.')
    }

    // console.log(foundClass);


    const enrolledClass= await foundClass.populate('enrolledStudents');
    // console.log("enrolledClass");
    // console.log(enrolledClass);


    const enrolledStudents = enrolledClass.enrolledStudents;
    // console.log("enrolledStudents");
    // console.log(enrolledStudents);
    
    let students = [];

    const sendData= () => {
        students.sort((a,b) => {
            return a.totalScore - b.totalScore;
        })
        
        console.log("students");
        console.log(students);
        res.status(200).json(students);
    }

    enrolledStudents.forEach(async ({_id})=>{
        
        await User
        .find( { _id : _id }, {}
        ,{ enrolledClass :
            { $elemMatch : 
                { classId : req.params.id
                }
            }
        })
        .exec((err ,user) => {
            // console.log("User");
            // console.log(user[0]);
            if(err)
            {
                console.log(err);
                res.status(400);
                throw new Error("Error in fetching database");
            }
            var obj = {
                _id : user[0]._id,
                name: user[0].name,
                totalScore: user[0].enrolledClass[0].totalScore
            };
            students.push(obj);
            console.log(students);
        })
        

    })
})
//GET ALL CREATED CLASSES
// const getAllCreatedClass = asyncHandler(async (req, res) => {
     
//         User.findById(req.params.id)
//         .populate('createdClass').exec((err, classes)=>{
//                 res.status(200).json({
//                     _id: req.user._id,
//                     createdClass : classes.createdClass
//                 })
//         })

// })

//GET ALL ENROLLED CLASSES
// const getAllEnrolledClass = asyncHandler(async (req, res) => {
     
//     User.findById(req.params.id)
//     .populate('enrolledClass.classId').exec((err, classes)=>{

//             res.status(200).json({
//                 _id: req.user._id,
//                 enrolledClass : classes.enrolledClass
//             })
//     })

// })

module.exports={
    createClass,
    joinClass,
    getClassById,
    getClassLeaderboard,
    getAllClassOfUser,
    addTopic
    // getAllCreatedClass,
    // getAllEnrolledClass
}