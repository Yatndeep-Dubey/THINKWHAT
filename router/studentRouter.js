const express =require('express')
const studentRouter = express()
studentRouter.set("view engine","ejs")
studentRouter.set("views","./views/courses")
const bodyParser = require("body-parser");
studentRouter.use(bodyParser.urlencoded());
const studentController = require('../controller/studentController')
const courseController= require('../controller/courseController')


studentRouter.post("/uiuxform",studentController.postuiuxform)
//studentRouter.post("/addstudent",courseController.addstudentincourse)

//studentRouter.get("/updatepage",studentController.getupdatepage)
//studentRouter.post("/updatepage",studentController.taketransactionid)


module.exports= 
{
    studentRouter
}