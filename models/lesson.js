const mongoose = require('mongoose')

const lessonSchema=new mongoose.Schema({
    lessonNumber:{type:Number,required:true,unique:true},
    lessonName:{type:String,required:true},
    exam1Date:{type:String},
    exam2Date:{type:String},
})

module.exports = mongoose.model("Lesson",lessonSchema)