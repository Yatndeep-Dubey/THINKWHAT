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
courseRouter.get("/thanks",studentController.getthankspage)



courseRouter.post("/frontend",studentController.postuiuxform) 
courseRouter.post("/backend",studentController.postuiuxform)  
courseRouter.post("/flutter",studentController.postuiuxform)
courseRouter.post("/cloud",studentController.postuiuxform)
courseRouter.post("/uiux",studentController.postuiuxform)
courseRouter.post("/react",studentController.postuiuxform)
courseRouter.post("/angular",studentController.postuiuxform)
courseRouter.post("/dsa",studentController.postuiuxform)

//courseRouter.post("/addcourse",courseController.postcourse)
//courseRouter.get("/admin/coursedetails",courseController.getcoursedetails)










module.exports={
    courseRouter
}
