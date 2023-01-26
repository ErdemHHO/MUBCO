const express=require("express");

const teacherController=require("../controllers/teacher.js");

const router = express.Router();

//DERS OLUŞTURMA
router.post('/createLesson',teacherController.createLesson);

//ÖĞRENCİ DEĞERLENDİRME
router.post('/assessment',teacherController.assessment)

//HARF NOTU OLUŞTURMA
router.get('/createLetterGrade',teacherController.createLetterGrade)

//ÖĞRENCİLERİ GÖRÜNTÜLEME
router.get('/getStudent',teacherController.getStudent)

//ÖĞRENCİLERE DERS ATAMASI YAPMA
router.patch('/assignLesson/:id',teacherController.assignLesson);

//DERS BİLGİLERİ GÜNCELLEME (SINAV TARİHLERİ İÇİN)
router.patch('/:id',teacherController.updateLesson)

//ÖĞRENCİLERİN İLGİLİ DERSTEN OLAN NOT BİLGİLERİNİ GÖRÜNTÜLEME
router.get('/getPoints/:number',teacherController.getPoints)

module.exports = router;