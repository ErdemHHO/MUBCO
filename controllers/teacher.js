const mongoose=require("mongoose");
const lessonSchema=require("../models/lesson.js");
const studentSchema=require("../models/student.js");
const pointSchema=require("../models/point.js");


const createLesson=async function(req, res) {

    const {lessonNumber,lessonName}=req.body;

    try {
        if(!lessonNumber && !lessonName){
            return res.status(400).json({msg:'Alanlar Boş Geçilemez'})
        }
        const dersAra=await lessonSchema.findOne({lessonNumber});
        if(dersAra){
            return res.status(400).json({msg:'Bu ders zaten mevcut'})
        }
        const dersler=await lessonSchema.create({lessonNumber,lessonName});
        return res.status(200).json(dersler);

    } catch (error) {
        return res.status(400).json({msg:error.message});
    }
    
}

const updateLesson=async function(req, res) {

    const {id} =req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg:"Geçersiz id"})
        }
        const ders=await lessonSchema.findByIdAndUpdate({_id:id,},{
            ...req.body
        },{new:true})

        if(!ders){
            return res.status(404).json({msg:"Ders Bulunamadı"})
        }
        res.status(200).json(ders);

    } catch (error) {
        return res.status(400).json({msg:error.message});
    }
    
}

const assignLesson =async function(req,res) {
    
    const {id} =req.params;

    const lessonNumber=req.body.lessons;
    console.log(lessonNumber)

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg:"Geçersiz id"})
        }
        //Girilen derslerin lessonSchemada olup olmadığı kontrol ediliyor
        for (let i = 0; i < lessonNumber.length; i++) {
            let element = lessonNumber[i];
            const dersVarMı=await lessonSchema.findOne({lessonNumber:element});

            if (!dersVarMı) {
                return res.status(404).json({msg:"Geçersiz ders numaraları girdiniz"})
            }
        }

        const ogrenci=await studentSchema.findById({_id:id})
        if(!ogrenci){
            return res.status(404).json({msg:"Öğrenci Bulunamadı"})
        }
        //Girilen derslerin lessonSchemada olup olmadığı kontrol ediliyor
        const degerler=await ogrenci.lessons;

        //Bu şekilde yapılmasının nedeni dersleri eklerken eski derslerin silinmemesi veya dersler dizisinin içerisindeki değerlerin tekrar tememesi
        const uniqueArray = [...new Set([...degerler, ...lessonNumber])];
        await ogrenci.updateOne({lessons:uniqueArray});
        return res.status(200).json(ogrenci);

    } catch (error) {
        return res.status(400).json({msg:error.message});
    }

}

const assessment=async (req,res)=>{
    //Bodyden öğrenci id si alınıyor.
    const studentNumber =req.body.studentNumber;
    //Bodyden ders id si alınıyor.
    const lessonNumber=req.body.lessonNumber;
    try {

    //gelen id bilgisine göre öğrenciyi bulalım
    const ogrenci=await studentSchema.findOne({studentNumber:studentNumber});
    if(!ogrenci) return res.status(404).json({msg:"Öğrenci kaydı yok"})

    //Öğrenci o dersten sorumlu mu
    const responsibility=await ogrenci.lessons.includes(lessonNumber);
    if(!responsibility) {
        return res.status(404).json({msg:"Öğrenci dersten sorumlu değil"})
    }
    
    //Girilen notlar 100 den büyük mü ve 0 dan küçük mü
    if(req.body.exam1point>100 || req.body.exam1point<0 || req.body.exam2point>100 || req.body.exam2point<0) return res.status(404).json({msg:"Geçersiz not girdiniz"})

    //Öğrencinin daha önce o dersle ilgili bir değerlendirmesi var mı ?
    const ogrenciDeğerlendirme=await pointSchema.findOne({studentNumber:studentNumber,lessonNumber:lessonNumber});

    //Yoksa şemaya öğrencinin dersle ilgili bilgileri girilecek
    if(!ogrenciDeğerlendirme) {
        const createStudentPoint=await pointSchema.create(req.body)
        return res.status(200).json(createStudentPoint);
    }

    const pointSchemaID=ogrenciDeğerlendirme._id.toString();
    //Varsa girilen yeni değerler ile güncellenecek

    Object.assign(ogrenciDeğerlendirme, req.body);
    await ogrenciDeğerlendirme.save();

    return res.status(200).json(ogrenciDeğerlendirme);

    } catch (error) {
        return res.status(400).json({msg:error.message});
    }
}


const createLetterGrade=async function(req,res) {
    try {
        function calculateLetterGrade(average) {
            if (average >= 90) {
                return 'A';
            } else if (average >= 80) {
                return 'B';
            } else if (average >= 70) {
                return 'C';
            } else if (average >= 60) {
                return 'D';
            } else {
                return 'F';
            }
        }
        const points = await pointSchema.find();
        points.forEach(async point => {
            if (point.exam1point && point.exam2point) {
                point.letterGrade = calculateLetterGrade((point.exam1point + point.exam2point) / 2);
                await point.save();
            }
        });
        const points2 = await pointSchema.find();
        return res.status(200).json(points2);
    } catch (err) {
        console.log(err);
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

const getPoints=async(req,res)=>{
    const {number}=req.params;
    try {
        const getPoints=await pointSchema.find({lessonNumber:number})
        if(getPoints.length<=0) return res.status(404).json({msg:"Dersle ilgili herhangi bir puan bilgisi yok"})
        return res.status(200).json(getPoints);
    } catch (error) {
        
    }
}

module.exports={
    createLesson,
    updateLesson,
    assignLesson,
    assessment,
    createLetterGrade,
    getStudent,
    getPoints
}