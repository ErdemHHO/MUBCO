const mongoose = require('mongoose')

const studentSchema=new mongoose.Schema({
    studentNumber:{type:String,required:true,unique:true},
    studentName:{type:String,required:true},
    grade:{type:Number,required:true},
    password:{type:String,required:true},
    lessons: [{
        type:Number,
        default:['']
    }]
})

module.exports = mongoose.model("Student",studentSchema)