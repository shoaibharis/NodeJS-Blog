const mongoose=require("mongoose");
const Detail=mongoose.Schema({
    brand: String,
    iconUrl: String,
    links: [{
        label:String,
        url:String
    }
]
});
module.exports=mongoose.model("Details",Detail);