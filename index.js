require('dotenv').config()
const express = require('express')
const app = express();
const port= process.env.PORT||7021
const courseRouter = require('./router/courseRouter')
const userRouter = require('./router/userRouter')
const studentRouter = require('./router/studentRouter')
const adminRouter = require('./router/adminRouter')
const mongoose = require('mongoose')
const mongourl=process.env.MONGOURL
const bodyParser = require("body-parser");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieParser = require('cookie-parser')
const { name } = require('ejs');
var userProfile;
app.use(bodyParser.urlencoded());
app.use(cookieParser())
app.use(passport.initialize());
// running server
app.listen(port,()=>
{
    console.log(`Running Server At ${port}`)
})
// setting view engine
   app.set("view engine","ejs")
   app.set('views','./views')
   app.use("/public/images",express.static('./public/images'));
// showing main page

app.get("/contact",(req,res)=>
{
    res.render('contact')
})
app.get("/about",(req,res)=>
{
    res.render('about')
})
app.use("/course",courseRouter.courseRouter)
app.use("/student",studentRouter.studentRouter)
app.use("/",userRouter.userRouter)
app.use("/admin",adminRouter.adminRouter)
//Database Connection
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Database Connected"));
/////////// Sign In With GOOGLE..../////////..............######
app.get("/",(req,res)=>
{
    const name = req.query.displayName
    res.render('index',{message:userProfile})
})

/// passport work
const DATA = [{email:"test@gmail.com", password:"1234"}]
const jwt = require('jsonwebtoken');
const userModel = require('./model/userModel');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts={}
opts.jwtFromRequest = function (req)
{
 var token = null
 if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  
    if (CheckUser(jwt_payload.data)) {
        return done(null, jwt_payload.data)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false);
    }
}));
passport.use(new GoogleStrategy({
    clientID: "617096281034-flicc37env4qogtn1quuous1e3rjl8o5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/googleRedirect"
  },
  function(accessToken, refreshToken, profile, cb) {
      //console.log(accessToken, refreshToken, profile)
      return cb(null, profile)
  }
));
passport.serializeUser(function(user, cb) {
    console.log('I should have jack ')
    cb(null, user);
});
  
  passport.deserializeUser(function(obj, cb) {
    console.log('I wont have jack shit')
    cb(null, obj);
});
app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))
app.get('/googleRedirect', passport.authenticate('google'),(req, res)=>{
    
    let user = {
        displayName: req.user.displayName,
        name: req.user.name.givenName,
        email: req.user._json.email,
        provider: req.user.provider }

    FindOrCreate(user)
    let token = jwt.sign({
        data: user
        }, 'secret');
    res.cookie('jwt', token)
    userProfile=user.displayName
    res.redirect('/')
})
function FindOrCreate(user){
    if(CheckUser(user)){  // if user exists then return user
        return user
    }else{
        DATA.push(user) // else create a new user
    }
}
function CheckUser(input){
    console.log(DATA)
    console.log(input)
  
    for (var i in DATA) {
        if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
        {
            console.log('User found in DATA')
            return true
        }
        else
         null
            //console.log('no match')
      }
    return false
}

// email pass authentication 
app.get("/login",(req,res)=>
{
    res.redirect('/login')
})
     // kuch hai yaha
     app.post("/login",async (req,res)=>
    {
    try{
            const lemail= req.body.email
            const password = req.body.password
            const user = await userModel.findOne({email:lemail})
            if(user)
            {
                const pass= user.password
                if(pass==password)
                {
                    let token =    jwt.sign({
                        data: req.body
                        }, 'secret');
                    res.cookie('jwt', token)
                    displayName=user.displayName
                    userProfile=user.displayName
                res.redirect('/')
                }
                else{
                  res.render('userlogin',{error:"Invalid Password"})
                }
            }
            else{
            //  
                res.render('userlogin',{error:'Invalid Credentials'})
            }
    }
    catch(error)
    {
        console.log(error.message)
    }
   }
)

  // course routers 
app.get("/getuiux", async (req,res)=>
{
    res.redirect("/course/uiux?uname="+userProfile)
})
app.get("/getfrontend", async (req,res)=>
{
    res.redirect("/course/frontend?uname="+userProfile)
})
app.get("/getbackend", async (req,res)=>
{
    res.redirect("/course/backend?uname="+userProfile)
})
app.get("/getangular", async (req,res)=>
{
    res.redirect("/course/angular?uname="+userProfile)
})
app.get("/getreact", async (req,res)=>
{
    res.redirect("/course/react?uname="+userProfile)
})
app.get("/getcloud", async (req,res)=>
{
    res.redirect("/course/cloud?uname="+userProfile)
})
app.get("/getdsa", async (req,res)=>
{
    res.redirect("/course/dsa?uname="+userProfile)
})
app.get("/getflutter", async (req,res)=>
{
    res.redirect("/course/flutter?uname="+userProfile)
})
app.get('/logout', (req, res, next) => {
    // manually set cookie headers, cause `req.logout` does not work
    // req.logout()
    res.clearCookie('jwt')
     res.redirect('/')
     userProfile=undefined;
  })