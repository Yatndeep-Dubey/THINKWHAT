const mongoose = require('mongoose')
const {Schema} = mongoose

const studentSchema = new Schema(
    {
        name:
        {
            type:String
        },
        mobile:
        {
            type:Number
        },
        email:
        {
            type:String
        },
        courses:
        {
           type:String
        },
        courseID:
        {
             type:String
        },
        transactionID:
        {
            type:String,
            default:''
        },
        isVerified:
        {
            type:Boolean,
            default:0
        },
        
  verifyingadmin:
        {
            type:String,
            default:''
        },
     payment:
        {
            type:String,
            default:''
        }

    }
)
module.exports = mongoose.model("studentModel",studentSchema)