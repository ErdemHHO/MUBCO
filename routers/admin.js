const express=require("express");

const router = express.Router();

const adminController=require("../controllers/admin.js");

router.post('/createStudent',adminController.createStudent);

router.post('/createTeacher',adminController.createTeacher);

router.delete('/deleteStudent/:id',adminController.deleteStudent);

router.delete('/deleteTeacher/:id',adminController.deleteTeacher);

router.get('/getTeacher',adminController.getTeacher);

router.get('/getStudent',adminController.getStudent);

module.exports = router;