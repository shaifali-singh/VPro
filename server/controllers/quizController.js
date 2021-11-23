const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Class = require('../models/Class');
const Quiz = require('../models/Quiz');


//Create a new Quiz
const createQuiz = asyncHandler(async (req, res) => {

    const {quiz_name, instructions, questions,duration, classId } = req.body;

    //user should be the class teacher
    const foundClass = await Class.findById(classId);

    if(!(String(foundClass.classTeacher) === String(req.user._id))){
        res.status(400);
        throw new Error('You are not the class teacher hence can not create quiz')
    }

    
    const newQuiz = await Quiz.create({
        name: quiz_name,
        instructions,
        questions,
        duration,
        classId 
    })

    if(newQuiz){

        if(!foundClass){
            res.status(400);
            throw new Error('Class does not exist');
        }

        foundClass.quizzes.push(newQuiz._id);
        foundClass.save();

        res.status(201).json({
            newQuiz,
            message:"Quiz Created Successfully"

        })

    }
    else{
        res.status(400);
        throw new Error('Quiz Cannot be created')
    }

  }) 


// GET A QUIZ BY ID
const getQuizById = asyncHandler(async (req, res) => {

    const quiz = await Quiz.findById(req.params.id) ;
    if(quiz){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('Quiz not found')
    }

})

//ALLOW USER TO TAKE QUIZ
const allowUserForQuiz = asyncHandler(async(req, res)=>{

    const {quiz_id} = req.body;
    
    const quiz = await Quiz.findById(quiz_id);

    if(!quiz){
        res.status(404);
        throw new Error('Quiz Not found');
    }

    //check if user is enrolled in this class or not
    const foundClass = await Class.findById(quiz.classId);
    if(!foundClass){
        res.status(404);
        throw new Error('Class not found')
    }

    if(!(foundClass.enrolledStudents.includes(req.user._id))){
        res.status(400)
        throw new Error('You are not enrolled in this class to take this quiz')
    }

    //check if user already attempted this quiz or not


})

module.exports={
    createQuiz,
    getQuizById
}