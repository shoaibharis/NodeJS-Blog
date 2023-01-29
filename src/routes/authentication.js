const express=require("express");
const auth=express.Router();
const passport=require("passport");
const mongoose=require("mongoose");
const session=require("express-session");
const passportLocalMongoose=require("passport-local-mongoose");
const LocalStrategy = require("passport-local");
const Schema=require("../models/Register");
const Detail=require("../models/Detail");
auth.use(session({
    secret:"our little secret.",
    resave:false,
    saveUninitialized:false
}))

auth.use(passport.initialize());
auth.use(passport.session());

Schema.plugin(passportLocalMongoose)

const User=mongoose.model("user",Schema)

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

auth.get("/login",async(req,res)=>{
    const result=await Detail.findOne();
    res.render("login",{
        details:result
    })
})

auth.get("/register",async(req,res)=>{
    const result=await Detail.findOne();
    res.render("register", {
        details:result
    })
});

auth.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

auth.get("/compose",isLoggedIn,async (req,res)=>{
    
     const result=await Detail.findOne();
   // if(req.isAuthenticated()){
        res.render("compose",{
            details:result,
            user:req.user
       });
   // }
   // else{
     //   res.redirect("/login")
   // }
})



auth.post("/register",async  (req,res)=>{
    const result=await Detail.findOne();
   // var registerUser = new User({ username: req.body.username, email: req.body.email });

    User.register({username:req.body.username, email:req.body.email}, req.body.password, function(err,user){
       if(err){
        console.log(err)
        
        res.render("register",{
            error:err,
            details:result
        })
       } 
       else{
        passport.authenticate("local")(req,res,function(){
           res.redirect("/compose") 
        })
       }
    })});   
    
auth.post("/login", passport.authenticate("local",{
        successRedirect: "/compose",
        failureRedirect: "/login"
    }), function(req, res){
        
    });
   function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
// auth.post("/login", async (req,res)=>{
// //var id = req.session.passport.user[0].id;

// const user=new User({
//             username:req.body.username,
//             email:req.body.email,
//             password:req.body.password
//         });
        
//         req.login(user,function(err){
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 passport.authenticate("local")(req,res,()=>{
//                     //res.redirect("/compose")
//                      //console.log(req.session.passport.username);
//                     res.render("compose", {
//                         user:req.user
//                     });
//                 })
//             }
//         })
//          });
module.exports=auth;
