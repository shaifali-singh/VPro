const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken= require('../utils/generateToken');

 //Create a new User
const registerUser = asyncHandler(async (req, res) => {
    const { name,email, password } = req.body
  
    const existUser = await User.findOne({ email })
  
    if (existUser){
        res.status(400);
        throw new Error('User already exist!')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
                 _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
        })

    }else{
        res.status(400);
        throw new Error('Invalid User Data')
    }

  }) 

  //Authenticate User
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      console.log("From Backend", email) //testing
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isTeacher: user.isTeacher,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

  //Get a Particular User
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password') ;
  if(user){
    res.json(user);
  }else{
    res.status(404);
    res.json("User not found!")
  }
})

module.exports={
    authUser,
    registerUser,
    getUserById
}