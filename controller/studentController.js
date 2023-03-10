const { find } = require('../model/studentModel');
const studentModel = require('../model/studentModel')
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
        var letters = /^[a-zA-Z]*$/;
        var stname =singleStudent.name;
        var mob = singleStudent.mobile;

        if(stname.match(letters))
        {
            
            if(`${mob}`.length==10)
            {
              
                console.log("sahi hai")
            }
            else{
                console.log("10 digit ka number dal")
            }
        }
        else{
            console.log("name should be in alphabetical form")
        }
}

catch(error)
{
    console.log(error.messsage);
}

       
}
const getupdatepage = (req,res)=>
{
   res.render('updatepage')
}
/*
const taketransactionid = async (req,res)=>
{
    console.log("Transaction Chal rha hai")
   
    const sid='63f891689b9c5bfb246663dd';
    console.log(sid)
    const transactionID =req.body.payment
    const payment =req.body.payment
    const trid = await studentModel.findByIdAndUpdate({_id:sid},{$set:{transactionID:transactionID,payment:payment}})
    res.send(trid)
}
*/
module.exports={
  postuiuxform,
 // taketransactionid,
  //getupdatepage
  
}