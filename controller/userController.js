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
    const name = req.body.name
    const email = req.body.email
    const password=req.body.password
    const confirmpassword = req.body.cpassword
      // check if the are empty 
      if (!email || !name || !password || !confirmpassword) 
      {
        res.render("usersignup", { err: "All Fields Required !"});
    } 
    else if (password != confirmpassword)
     {
        res.render("usersignup", { err: "Password Don't Match !"});
     }

     else{
        const user = await userModel.findOne({email:email})
        if(user)
        {
            res.render('usersignup',{err:"User Already Exist"})
        }
        else{
            try
        {

          const singleuser=new userModel(
          {
            displayName:req.body.name,
            email:req.body.email,
            password:req.body.password
          });
          const userData = await singleuser.save();
           res.render('usersignup',{err:"Added Successfully"})
    }
    catch(error)
    {
        console.log(error.message)
    }
        }
    
}
}
/*
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
            displayName=user.displayName
            res.redirect('/?displayName='+displayName)
        }
        else{
            res.render('userlogin',{error:"Invalid Password"})
        }
    }
    else{
        res.render('userlogin',{error:"Invalid Credentials"})
    }
    }
    catch(error)
    {
        console.log(error.message)
    }
}
*/

module.exports = {
    getLoginpage,
    getsignup,
    adduser,
   // loginuser
}