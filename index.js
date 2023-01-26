const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');

const adminRouter=require("./routers/admin.js");
const studentRouter=require("./routers/student.js");
const teacherRouter=require("./routers/teacher.js");

const app=express();
dotenv.config();

app.use(express.json());

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT,". port dinleniyor")
    mongoose
      .set("strictQuery", false)
      .connect(process.env.MOGODB_URI)
      .then(() => console.log("connected to db"))
      .catch((error) => console.log(error));
  });
