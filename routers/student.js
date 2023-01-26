const express=require("express");

const router = express.Router();

const studentController=require("../controllers/student.js");


router.get('/getLesson',studentController.getLesson);


router.get('/getPoints',studentController.getPoints);

module.exports = router;