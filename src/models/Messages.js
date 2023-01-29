const mongoose=require("mongoose");
const Message=mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String
})
module.exports=mongoose.model("message",Message);