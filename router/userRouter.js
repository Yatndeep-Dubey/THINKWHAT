
const express = require('express')
const userRouter = express()
const userController = require('../controller/userController')
userRouter.set("view engine","ejs")
userRouter.set("views","./views")
const bodyParser = require("body-parser");
userRouter.use(bodyParser.urlencoded());
const session= require("express-session");
userRouter.use(session({secret:"mysessionsite"}))

userRouter.get("/login",userController.getLoginpage)
userRouter.get("/signup",userController.getsignup)
userRouter.post("/signup",userController.adduser)
userRouter.post("/login",userController.loginuser)
module.exports = {
    userRouter
}