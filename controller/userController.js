const userModel = require("../model/userModel")

const getLoginpage = async (req,res)=>
{
    try{
            res.render('userlogin')
    }
    catch(error)
    {
          console.log(error.message)
    }
}
const getsignup = async (req,res)=>
{
    try{
             res.render('usersignup')
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const adduser = async (req,res)=>
{
    console.log(req.body.email)
    try
    {

          const singleuser=new userModel(
          {
            displayName:req.body.name,
            email:req.body.email,
            password:req.body.password
          });
          const userData = await singleuser.save();
           res.send("Added Successfully")
    }
    catch(error)
    {
        console.log(error.message)
    }
}
const loginuser = async (req,res)=>
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
            req.session.admin_id= user._id
            res.redirect("/")
        }
        else{
            res.send("Invalid Password")
        }
    }
    else{
        res.send("Invalid Credentials")
    }
    }
    catch(error)
    {
        console.log(error.message)
    }
}
module.exports = {
    getLoginpage,
    getsignup,
    adduser,
    loginuser
}