
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _=require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const server=process.env.SERVER;
mongoose.connect(server);

const schema = new mongoose.Schema({ postHeading:'string', postContent:'string'});
const Post = mongoose.model('Post',schema);

const customSchema = new mongoose.Schema({customName:'string',customContent:'string'});
const Custom = mongoose.model('Custom',customSchema);

app.get("/",function(req,res)
{
  const homeStartingContent =new Post({postHeading:"Home",postContent:"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."});
  Post.findOne({postHeading:"Home"}).then((con) => 
  {
    if(con==null)
    {
      homeStartingContent.save();
      res.redirect('/');
    }
    else
    {
      const content=con;
      Custom.find().then((posts)=>
      {
        res.render('home',{homeStartingContent: content.postContent,posts:posts});
      });
    }
    
  });
});

app.get("/posts/:postName",function(req,res){
  Custom.findOne({customName:req.params.postName}).then((posts)=>
  {
    console.log("post:"+posts);
    res.render('post',{postHeading:posts.customName,postContent:posts.customContent});
  });
});

app.get("/about",function(req,res){
  const aboutContent =new Post({postHeading:"About",postContent:"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."});
  
  Post.findOne({postHeading:"About"}).then((foundUser) => 
  {
    if(foundUser==null)
    {
      aboutContent.save();
      res.redirect('/about');
    }
    else
    {
      const content=foundUser;
      console.log(content);
      res.render('about',{aboutContent: content.postContent});
    }
   
  });
});

app.get("/contact",function(req,res){
  const contactContent =new Post({postHeading:"contact",postContent:"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."});
  // contactContent.save();
  Post.findOne({postHeading:"contact"}).then((foundUser) => 
  {
    if(foundUser==null)
    {
      contactContent.save();
      res.redirect('/contact');
    }
    else
    {
      const content=foundUser;
      console.log(content);
      res.render('contact',{contactContent: content.postContent});
    }
    
  });
});


app.get("/compose",function(req,res){
  res.render('compose');
});

app.post("/compose",function(req,res){

  const customPost = new Custom({
    customName:req.body.postTitle,
    customContent:req.body.postBody
  });
  customPost.save();
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
