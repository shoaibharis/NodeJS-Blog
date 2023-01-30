const express=require("express")
const multer=require("multer")
const bodyParser=require("body-parser")
const Post=require("../models/Posts");
const Detail=require("../models/Detail");
const datetime = require("../../public/js/current-time");
const writePost=express.Router();
writePost.use(bodyParser.urlencoded({ extended: true }))
writePost.use(express.static('/public/js/current-time.js'))
// //storage
// const storage=multer.diskStorage({
//     destination: "/static/uploads",
//    filename : (req, file , cb)=>{
//             // cb(null, Date.now(+file+originalname));
//            cb(null,file.originalname)
//     }
// })

// const upload=multer({
//     storage:storage
// })

// writePost.get("/compose",async (req,res)=>{
//     const result=await Detail.findOne({"_id":"63cc00e5c1d0369daace8205"});
//     res.render("compose" ,{
//         details:result
//     })
// })
writePost.post("/post-process",async(req,res)=>{
 const post=new Post({
    postedBy:req.body.username,
    time:datetime,
    title:req.body.title,
    description:req.body.description,
    image:req.body.img
 })
 post.save();
 const read=await Post.findOne({"_id":post._id});
 const result=await Detail.findOne();
  res.render("Post",{
    post:read,
    details:result

  })
})

writePost.post("/readPost",async(req,res)=>{
    const result=await Detail.findOne();
    const read=await Post.findOne({"_id":req.body.postID})
    res.render("Post",{
        post:read,
        details:result
    })
})

writePost.get("/Blog",async(req,res)=>{
    const result=await Detail.findOne()
    const read=await Post.find();
    read.forEach((trim)=>{
        trim.description=trim.description.substring(0,100);
        trim.description=trim.description+"....";
    })
    res.render("Blog",{
        details:result,
        posts:read
    })
});

writePost.get("/posts/:postName",async function(req, res){
    const result=await Detail.findOne(); 

    const requestedTitle = req.params.postName.toLowerCase();
    
    var postId=""
    var found={}
    var recievedTitle=""
    
    const read=await Post.find()
    
    read.forEach((y)=>{
    //lower case and remove spaces
        recievedTitle=y.title.toLowerCase().replace(/\s+/g, '')
    
     if(requestedTitle===recievedTitle){
           found=y
       }
   }) 
res.render("Post",{
    details:result,
    post:found
})
})

module.exports=writePost;

