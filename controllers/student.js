const mongoose=require("mongoose");
const studentSchema=require("../models/student.js");
const lessonSchema=require("../models/lesson.js");
const pointSchema=require("../models/point.js");


const getLesson=async function(req, res) {
    try {

        //!!!!!!!!!!!!!!!!!!!!!!Number manuel verdim düzeltmeliyim
        const dersProgramı=await studentSchema.find({studentNumber:5234234});
        const lessonArray=dersProgramı[0].lessons;
        const dersBilgileri=[];
        for(let i=0;i<lessonArray.length;i++){
            let element = lessonArray[i];
            let gelenDersBilgileri=await lessonSchema.findOne({lessonNumber:element});
            dersBilgileri.push(gelenDersBilgileri);
        }
        return res.status(200).json(dersBilgileri)
    } catch (error) {
        return res.status(400).json({msg:error.message});
    }    
}

const getPoints=async function(req,res){
    //point şemasındaki öğrenciye ait tüm veriler döndürülmeli
    try {
        //student number değiştirilmeli
        const studentPoints=await pointSchema.find({studentNumber:234234});
        if(studentPoints.length<=0) return res.status(200).json({msg:"Not Bilgisi Bulunamadı"})
        return res.status(200).json(studentPoints)
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
}

module.exports={
    getLesson,getPoints
}