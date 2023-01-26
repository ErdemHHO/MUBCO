const mongoose = require('mongoose')

const studentCourseSchema=new mongoose.Schema({
    teacherNumber:{type:String,required:true,unique:true},
    teacherName:{type:String,required:true},
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    password:{type:String,required:true},
})

module.exports = mongoose.model("studentCourse",studentCourseSchema)