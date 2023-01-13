
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const { String } = require("mongoose/lib/schema/index");

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/user2DB",{ useNewUrlParser: true , useUnifiedTopology: true });


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const User = mongoose.Schema({
  username:String,
  password:String
});

const secret = "itismylittlesecret";
User.plugin(encrypt, {secret:"secret", encryptedFeilds:["password"]});


const user = mongoose.model("user", User);

app.get("/", function(req,res){
    res.render("home");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/register", function(req,res){
  const user1 = new user({
    username:req.body.username,
    password:req.body.password
  });
  user1.save(function(err){
    if(!err){
      res.render("secrets");
    }
    else{
      res.send(err);
    }
  })
});

app.post("/login", function(req,res){
  const Username=req.body.username;
  const Password=req.body.password;
  user.findOne({Username},function(err, foundItem){
    if(foundItem.username === Username){
      if(foundItem.password === Password){
        res.render("secrets");
      }else{
        res.send("Password Incorrect");
      }
    }else{
      res.send("Something Went Wrong");
    }
  })
})






app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
