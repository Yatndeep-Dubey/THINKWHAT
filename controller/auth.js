require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieParser = require('cookie-parser')
// Env variables.........
const clientID = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
const callbackurl = process.env.CBURL


const session = require('express-session')
app.use(session({
    secret:"My Secret",
    resave:false,
    saveUninitialized:false
}))

const { name } = require('ejs');
var userProfile;
var userEmail;
app.use(bodyParser.urlencoded());
app.use(cookieParser())
app.use(passport.initialize());
// running server

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



/////////// Sign In With GOOGLE..../////////..............######
app.get("/",(req,res)=>
{
    res.render('index',{message:req.session.userProfile})
})

/// passport work
const DATA = [{email:"test@gmail.com", password:"1234"}]
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
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
    clientID:clientID,
    clientSecret:clientSecret,
    callbackURL:callbackurl
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
     req.session.userProfile=user.displayName
    req.session.userEmail=user.email
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
                    const verified = user.is_verified;
                    if(verified==1)
                    {
                            let token =    jwt.sign({
                                data: req.body
                                }, 'secret');
                            res.cookie('jwt', token)
                            displayName=user.displayName
                            req.session.userProfile=user.displayName
                            req.session.userEmail=user.email
                                res.redirect('/')
                    }
                    else
                    {
                       res.render('userlogin',{message:"your mail is not verified"})   
                    }
                }
                else{
                  res.render('userlogin',{message:"Invalid Password"})
                }
            }
            else{
            //  
                res.render('userlogin',{message:'Invalid Credentials'})
            }
    }
    catch(error)
    {
        console.log(error.message)
    }
   }
)




  //courserouters
  const getfrontend = async (req,res)=>
{
    res.render('frontend',{username:req.session.userProfile,usermail:req.session.userEmail})
}
const getbackend = async (req,res)=>
{
    
     res.render('backend',{username:req.session.userProfile,usermail:req.session.userEmail})
}
const getcloud = async (req,res)=>
{
   
        res.render('cloud',{username:req.session.userProfile,usermail:req.session.userEmail})
}
const getuiux = async (req,res)=>
{
       
       res.render('uiux',{username:req.session.userProfile,usermail:req.session.userEmail})
}
const getflutter = async (req,res)=>
{

       res.render('flutter',{username:req.session.userProfile,usermail:req.session.userEmail})
}
const getReact = async (req,res)=>
{
     res.render('react',{username:req.session.userProfile,usermail:req.sessionuserEmail})

}
const getAngular = async (req,res)=>
{
    
     res.render('Angular',{username:req.session.userProfile,usermail:req.sessionuserEmail})
}
const getdsa = async (req,res)=>
{
    
    res.render('dsa',{username:req.session.userProfile,usermail:req.sessionuserEmail})
}
app.get('/logout', (req, res, next) => {
    // manually set cookie headers, cause `req.logout` does not work
    // req.logout()
    res.clearCookie('jwt')
     res.redirect('/')
     userProfile=undefined;
     req.session.destroy();
  })
  module.exports =
  {
    app,
    userProfile,
    getAngular,
    getReact,
    getdsa,
    getbackend,
    getflutter,
    getuiux,
    getfrontend,
    getcloud
  }