const { application } = require("express");
const express= require("express");
const routes=express.Router();
const bodyParser=require("body-parser")
const Post=require("../models/Posts");
const Detail=require("../models/Detail");
const Slider=require("../models/Slider");
const Service=require("../models/Services");
const React=require("../models/React");
const Message=require("../models/Messages");

routes.use(bodyParser.urlencoded({ extended: true }))
routes.use(express.json());

routes.get("/",async (req,res)=>{
const result=await Detail.findOne();
const slides=await Slider.find();
const Services=await Service.find();
const ReactJS=await React.find();

const posts=await Post.find().limit(4);
posts.forEach((trim)=>{
 trim.description= trim.description.substring(0,50);
 trim.description=trim.description+"....";
})

res.render("index",{
    details:result,
    slides:slides,
    services:Services,
    reactJS: ReactJS,
    posts:posts
})
})

routes.post("/contact",(req,res)=>{
    const message=new Message({
        name:req.body.username,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message
    })
    message.save();
    res.redirect("/")
})

module.exports=routes;
