const mongoose = require('mongoose')
const {Schema} = mongoose

const courseSchema = new Schema({
    coursename:
    {
         type:String
    },
    courseID:
    {
          type:String
    },
    students:
    {
          studentID:{
                   type:mongoose.Schema.Types.ObjectId ,
                   ref:'studentModel'
                  }
     } 
})
module.exports= mongoose.model('courseModel',courseSchema)