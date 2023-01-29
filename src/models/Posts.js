const mongoose=require("mongoose");
const Post=mongoose.Schema({
    postedBy:String,
    time:String,
    title:String,
    description:String,
    image:String
})
module.exports=mongoose.model("post",Post);