//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");

const app = express();

app.use("*/bootstrap",express.static("assets/bootstrap"));
app.use("*/fonts",express.static("assets/fonts"));
app.use("*/img",express.static("assets/img"));
app.use("*/js",express.static("assets/js"));
app.use("*/css",express.static("assets/css"));


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

orders=["soframycin","dolo","crocin"];
cost=[21,22,23];

app.get("/", function(req, res){
  // res.sendFile(__dirname+"/index.html");
  res.render("home");
});
app.get("/placeorder", function(req, res){
  // res.sendFile(__dirname+"/index.html");
  res.render("placeorder",{orderList:orders,costList:cost});
});
app.get("/addmed", function(req, res){
  // res.sendFile(__dirname+"/index.html");
  res.render("addmed");
});

app.post("/addmed",function(req,res){
  console.log(req.body);
  var x=Number(req.body.cost);
  var y=Number(req.body.stock)

  var options={
    url:"https://owaismedplus.herokuapp.com/new_med",
    method: "POST",
    form:{
    name:req.body.name,
    category:req.body.category,
    cost:x,
    quantity:y
  }

  };

  request(options,function(err,res,body){
    if(err){
      console.log(err);
    }else{
      console.log(res.statusCode);
    }
  });
  res.redirect("/");
});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
