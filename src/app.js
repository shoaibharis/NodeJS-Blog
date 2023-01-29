const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))

const hbs=require("hbs");

const mongoose=require("mongoose");
app.use('/static',express.static("public"));

hbs.registerPartials("views/partials");
app.set("view engine","hbs");
app.set("views","views");

const Detail=require("./models/Detail");
const Slider=require("./models/Slider")
const Service=require("./models/Services");
const React=require("./models/React");
mongoose.connect("mongodb://127.0.0.1:27017/PortfolioDB",()=>{
    console.log("connected to db");
   /* React.create({
      title:"Learn ReactJS",
      description:"React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.",
      image:"/static/images/React-icon.png",
      link:""
    })
   /* Service.create({
      icon:"fa-sharp fa-solid fa-file",
      title:"Source Code",
      description:"Get Clean Code",
      link:""
    },
    {
      icon:"fa-sharp fa-solid fa-shield",
      title:"Protection",
      description:"User information is protected",
      link:""
    },
    

    /*  {icon:"fa-sharp fa-solid fa-code",
      title:"Learn HTML",
      description:"Fundamentals of HTML",
      link:""
      })    */
   /* Slider.create({
          title:"Latest Innovations!",
          description:"Read about the current break throughs",
          image:"/static/images/img1.jpg"

        },
        {
            title:"Latest Innovations!",
            description:"Read about the current break throughs",
            image:"/static/images/img2.jpg"
  
          },
          {
            title:"Latest Innovations!",
            description:"Read about the current break throughs",
            image:"/static/images/img3.jpg"
  
          },
          {
            title:"Latest Innovations!",
            description:"Read about the current break throughs",
            image:"/static/images/img4.jpg"
  
          })

   Detail.create({
        name: "Portfolio",
        iconUrl: "/",
        links: [{
            label:"Home",
            url:"/"
        },
        {
            label:"About Us",
            url:"/about"
        }
        ,
        {
            label:"Contact Us",
            url:"/Contact"
        }
        ,
        {
            label:"Blog",
            url:"/Blog"
        },
        {
            label:"login",
            url:"/login"
        }
    ]
    })*/ 
})
const postRoute=require("./routes/Posts-Process");
const routes=require("./routes/main");
const authRoute=require("./routes/authentication");
app.listen(process.env.PORT || 3000, ()=> {
console.log("Server is running")
})
 app.use("",routes);
 app.use("",postRoute);
 app.use("",authRoute);
