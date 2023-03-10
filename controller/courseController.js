const courseModel = require('../model/courseModel')
const studentModel = require('../model/studentModel')
const getfrontend = async (req,res)=>
{
    const uname=req.query.uname;
    res.render('frontend',{message:uname})
}
const getbackend = async (req,res)=>
{
    const uname = req.query.uname;
     res.render('backend',{message:uname})
}
const getcloud = async (req,res)=>
{
    const uname =req.query.uname
        res.render('cloud',{message:uname})
}
const getuiux = async (req,res)=>
{
       const uname = req.query.uname;
       res.render('uiux',{message:uname})
}
const getflutter = async (req,res)=>
{
    const uname = req.query.uname;
       res.render('flutter',{message:uname},)
}
const getReact = async (req,res)=>
{
    const uname = req.query.uname;
     res.render('react',{message:uname})

}
const getAngular = async (req,res)=>
{
    const uname = req.query.uname;
     res.render('Angular',{message:uname})
}
const getdsa = async (req,res)=>
{
    const uname = req.query.uname;
    res.render('dsa',{message:uname})
}

const postcourse = async (req,res)=>
{
    const singlecourse = new courseModel(
        {
            coursename:"DSA",
            courseID:"TWDSA2023",
            students:{
               studentID:'63f790c482dd16815a0b8852'      
        }
        }
    )
    const course = await singlecourse.save();
    res.send("Added Successfully")
}
/*
const addstudentincourse = async (req,res)=>
{
    const courseID='TWDSA2023'
    const subject = await courseModel.findOne({courseID:courseID})
    console.log(subject._id);
    const studentID ='63f7a03b3e99ed87bad19aed'
    const courseid =subject._id
    const user = await courseModel.insertMany({studentID:studentID})
    res.send("Student Added in course")
}
const getcoursedetails= async (req,res)=>
{
    const coursedetails = await courseModel.findOne().populate('students.studentID')
    console.log(coursedetails)
    res.send("mila")
}
*/
module.exports = {
    getfrontend,
    getAngular,
    getReact,
    getbackend,
    getcloud,
    getflutter,
    getuiux,
    getdsa,
   // postcourse,
   // addstudentincourse,
   // getcoursedetails
}