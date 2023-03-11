const express =require('express')
const courseRouter = express()
courseRouter.set("view engine","ejs")
courseRouter.set("views","./views/courses")
const courseController = require('../controller/courseController')
const studentController= require('../controller/studentController')
const bodyParser = require("body-parser");
courseRouter.use(bodyParser.urlencoded());
const authController = require('../controller/auth')

courseRouter.get("/frontend",authController.getfrontend)
courseRouter.get("/backend",authController.getbackend)
courseRouter.get("/flutter",authController.getflutter)
courseRouter.get("/cloud",authController.getcloud)
courseRouter.get("/uiux",authController.getuiux)
courseRouter.get("/dsa",authController.getdsa)
courseRouter.get("/angular",authController.getAngular)
courseRouter.get("/react",authController.getReact)
courseRouter.post("/uiux",studentController.postuiuxform)
courseRouter.get("/thanks",studentController.getthankspage)

//courseRouter.post("/addcourse",courseController.postcourse)
//courseRouter.get("/admin/coursedetails",courseController.getcoursedetails)










module.exports={
    courseRouter
}
