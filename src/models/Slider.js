const mongoose=require("mongoose");
const slider=mongoose.Schema({
    title:String,
    description:String,
    image:String,
    class:String
})
module.exports=mongoose.model("slider",slider);