const studentModel = require('../model/studentModel')

const adminpage = async (req,res)=>
{
    const students = await studentModel.find()
    res.render('adminpage',{students:students})
}
/*
const updatestudent = async (req,res)=>{
    const sid = '63f7a03b3e99ed87bad19aed'
    const st= await studentModel.findByIdAndUpdate({_id:sid},{$set:{isVerified:1}})
    res.send("verified")
}
*/
const getupdatepage = async (req,res)=>
{
    const id= req.query.id;
    try{
        const paisadenevale= await studentModel.findById({_id:id})
        res.render('updatepage',{persons:paisadenevale});
    }
    catch(error)
    {
        console.log(error.message);
    }
}
const updateuser =async (req,res)=>
{
    const sid = req.body.id;
    const adminname = req.body.name;
    const st = await studentModel.findByIdAndUpdate({_id:sid},{$set:{isVerified:1,verifyingadmin:adminname}})
    res.redirect('/admin/adminpage')
}
const getstdetails = async(req,res)=>
{
    const courseid= req.body.courseID
    const student = await studentModel.find({courseID:courseid})
    res.render('getstdetails',{students:student})
}

module.exports= 
{
    adminpage,
   // updatestudent,
    updateuser,
    getupdatepage,
    getstdetails
}