
const { mongoose } = require("mongoose");
const bcrypt=require("bcryptjs");
const studentSchema=require("../models/student.js");
const teacherSchema=require("../models/teacher.js");


// const jwt =require("jsonwebtoken");

// const tokenOlustur=(_id)=>{
//     return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})
// }



const createStudent=async(req,res)=>{
    const {studentNumber,studentName,password,grade}=req.body;
    try {
    const ogretmenAra=await teacherSchema.findOne({studentNumber});
    const ogrenciAra=await studentSchema.findOne({studentNumber});
    if(!ogretmenAra && !ogrenciAra) {      
     const hashedPassword = await bcrypt.hash(password, 12);  
     const kullanici=await studentSchema.create({studentNumber,studentName,password:hashedPassword,grade});
     return  res.status(200).json({kullanici})       
    }
    return res.status(404).json({msg:"Bu numaraya kayıtlı başka biri var"})
    } catch (error) {
     return  res.status(400).json({msg:error.message});
    }
} 

const createTeacher=async(req,res)=>{
    
    const {teacherNumber,teacherName,password}=req.body;
    try {
    const ogretmenAra=await teacherSchema.findOne({teacherNumber});
    const ogrenciAra=await studentSchema.findOne({teacherNumber});
    if(!ogretmenAra && !ogrenciAra) {    
    const hashedPassword = await bcrypt.hash(password, 12);  
     const kullanici=await teacherSchema.create({teacherNumber,teacherName,password:hashedPassword});
     return  res.status(200).json({kullanici})       
    }
    return res.status(404).json({msg:"Bu numaraya kayıtlı başka biri var"})

    } catch (error) {
     return  res.status(400).json({msg:error.message});
    }
} 

const deleteStudent=async(req,res)=>{
    const {id}=req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Geçersiz id"})
        
        const deleteStudent=await studentSchema.findByIdAndDelete(id);
        return res.status(200).json(deleteStudent);

    } catch (error) {
        return res.status(400).json({msg:error.message});
    }
}

const deleteTeacher=async(req,res)=>{
    const {id}=req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Geçersiz id"})
        
        const deleteTeacher=await teacherSchema.findByIdAndDelete(id);
        return res.status(200).json(deleteTeacher);

    } catch (error) {
        return res.status(400).json({msg:error.message});
    }
}

const getTeacher=async(req,res)=>{
    try {
        const teachers=await teacherSchema.find();
        return res.status(200).json(teachers)
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
}

const getStudent=async(req,res)=>{
    try {
        const student=await studentSchema.find();
        return res.status(200).json(student)
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
}

module.exports={
    createStudent,
    createTeacher,
    deleteStudent,
    deleteTeacher,
    getTeacher,
    getStudent
}