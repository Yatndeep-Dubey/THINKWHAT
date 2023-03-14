require('dotenv').config()
const { find } = require('../model/studentModel');
const studentModel = require('../model/studentModel')
const nodemailer = require('nodemailer')

const adminmail = process.env.SMAIL
const adminpass = process.env.SPASS


//mail ka khel
const sendmail2 = async (receiver)=>
{
    const smail=adminmail;
    const spass= adminpass;
    console.log(receiver)
    
    var subjectto = "Course Enrollment"
    var message = "You will shortly recieve your invoice of payment and our team will reach you soon"
    console.log(subjectto + ' ' + message + ' ' + receiver)
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: smail, // generated ethereal user
        pass: spass // generated ethereal password
    }
}); 
//Sending mail to provided emailid
let info = transporter.sendMail({
        from: smail, // sender address
        to: receiver, // list of receivers
        subject: subjectto, // Subject line
        html: message
       
    },
    function(error) {
        
        console.log(error.message)
    })

}









const postuiuxform = async (req,res)=>
{
    
    const singleStudent = new studentModel(
        {
            name:req.body.name,
            // input
            mobile:req.body.mobile,
            //input
            email:req.body.email,
            // input
            courses:req.body.course,
            courseID:req.body.courseID,
            payment:req.body.payment,
            // input
            transactionID: req.body.trid
            //input
        }
    )
    try{
        
        
         const userdata = await singleStudent.save(); 
         const receiver= userdata.email;   
        //  sendmail2(receiver);
         res.render('thanks',{username:singleStudent.name});

   }

            catch(error)
            {
                console.log(error.messsage);
            }
}
/// frontend development

const getupdatepage = (req,res)=>
{
   res.render('updatepage')
}

const getthankspage = async (req,res)=>
{
    res.render('thanks',{username:"kuchbhi"})
}
























module.exports={
  postuiuxform,
  getthankspage,
 

 // taketransactionid,
  //getupdatepage
  
}