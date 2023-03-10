const express =require('express')
const adminRouter = express()
adminRouter.set("view engine","ejs")
adminRouter.set("views","./views/admin")
const bodyParser = require("body-parser");
adminRouter.use(bodyParser.urlencoded());
const studentController = require('../controller/studentController')
const courseController= require('../controller/courseController')
const adminController = require('../controller/adminController')

adminRouter.get("/adminpage",adminController.adminpage)
adminRouter.get("/updatepage",adminController.getupdatepage)
adminRouter.post("/updatepage",adminController.updateuser)
adminRouter.get("/getstudentdetails",adminController.getstdetails)
adminRouter.post("/getstudentdetails",adminController.getstdetails)
module.exports=
{
    adminRouter
}