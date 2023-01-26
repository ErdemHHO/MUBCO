const mongoose = require('mongoose')

const pointSchema=new mongoose.Schema({
    studentNumber:{type:String,required:true},
    lessonNumber:{type:String,required:true},
    exam1point:{type:Number},
    exam2point:{type:Number},
    letterGrade:{
        type:String,
    },
})

module.exports = mongoose.model("Point",pointSchema)