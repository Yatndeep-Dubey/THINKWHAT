const express =require('express')
const courseRouter = express()
courseRouter.set("view engine","ejs")
courseRouter.set("views","./views/courses")
const courseController = require('../controller/courseController')
const studentController= require('../controller/studentController')
const bodyParser = require("body-parser");
courseRouter.use(bodyParser.urlencoded());

courseRouter.get("/frontend",courseController.getfrontend)
courseRouter.get("/backend",courseController.getbackend)
courseRouter.get("/flutter",courseController.getflutter)
courseRouter.get("/cloud",courseController.getcloud)
courseRouter.get("/uiux",courseController.getuiux)
courseRouter.get("/dsa",courseController.getdsa)
courseRouter.get("/angular",courseController.getAngular)
courseRouter.get("/react",courseController.getReact)
courseRouter.post("/uiux",studentController.postuiuxform)

//courseRouter.post("/addcourse",courseController.postcourse)
//courseRouter.get("/admin/coursedetails",courseController.getcoursedetails)










module.exports={
    courseRouter
}
