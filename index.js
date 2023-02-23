require('dotenv').config()
const express = require('express')
const app = express();
const port= process.env.PORT||7021
const courseRouter = require('./router/courseRouter')
const userRouter = require('./router/userRouter')
const mongoose = require('mongoose')
const mongourl=process.env.MONGOURL
const bodyParser = require("body-parser");
const session = require('express-session');

app.use(bodyParser.urlencoded());
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
app.use("/",userRouter.userRouter)
//Database Connection
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Database Connected"));
/////////// Sign In With GOOGLE..../////////..............######
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
  var passport = require('passport');
  var userProfile;

  app.get("/",(req,res)=>
{
    if(typeof userProfile!=='undefined')
    {
        
        console.log("If chal rha hai")
        
        res.render('index',{message:userProfile.displayName})
    }
    else
    {
        console.log("Else chal rha hai")
        const displayName=req.query.displayName
        userProfile=
        {
           displayName:displayName
        }
        
        res.render('index',{message:userProfile.displayName})  
       
        
    } 
    
})
 
app.use(passport.initialize());
app.use(passport.session());
app.get('/error', (req, res) => res.send("error logging in"));
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
   
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  //// google auth
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  const GOOGLE_CLIENT_ID =process.env.CLIENTID;
  const GOOGLE_CLIENT_SECRET = process.env.CLIENTSECRET;
  
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        return done(null, userProfile);
    }
  ));
   
  app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] })
    );

   
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
      // Successful authentication, redirect success.
      res.redirect('/');
    });
    app.get("/logout",(req,res)=>
    {
        req.logout(()=>
        {
            userProfile=undefined;
        req.destroy.session;
        res.redirect('/')
        })
        
    })