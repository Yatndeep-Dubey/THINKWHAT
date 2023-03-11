const courseModel = require('../model/courseModel')
const studentModel = require('../model/studentModel')


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
    
   // postcourse,
   // addstudentincourse,
   // getcoursedetails
}