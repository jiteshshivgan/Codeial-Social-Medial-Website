//require model post
const User =require('../models/user');
const Post= require('../models/post');
//I need to export a function which is publically available to my routes file
module.exports.home=async function(req, res){
    //res.render('html.ejs file you want to render', {
    //     data you want to send with it
    // })
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //         //Using this posts.user we are fetching the user._id but if we populate it then we can fetch
    //         //all the details of the user

    //     });
        //shift the callback function to exec
     try{
        let posts=await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
   
        let users=await User.find({});
           
        return res.render('home', {
           title: "Codeial | Home",
           posts: posts,
           //Using this posts.user we are fetching the user._id but if we populate it then we can fetch
           //all the details of the user
           all_users: users
           });
         
     }catch(err){
        console.log('Error', err);
        return;
     }
     
     
      
    };
    

//module.exports.actionName=function(req, res){};

//using then
//Post.find({}).populate('comments').then(function());

//
let posts= Post.find({}).populate('comments').exec();
posts.then();
//posts.then contain the execution of above query.

