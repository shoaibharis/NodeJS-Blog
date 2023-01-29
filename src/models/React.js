const mongoose=require("mongoose");
const react=mongoose.Schema({
    title:String,
    image:String,
    description:String,
    link:String
})
module.exports=mongoose.model("react",react);