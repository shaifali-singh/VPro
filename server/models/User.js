const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        createdClasses : [String]
        // enrolledClasses:{
        //     type: Object,
        //     {classCode: {type: String}, score:{type: number}, quizleft:{}}
        // }
    },
    {
        timestamps:true
    }
)

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password= await bcrypt.hash(this.password,salt)
    }else{
        next()
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema);
module.exports =User