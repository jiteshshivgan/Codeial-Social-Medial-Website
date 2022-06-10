//require model post

const Post= require('../models/post');
//I need to export a function which is publically available to my routes file
module.exports.home=function(req, res){
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
     Post.find({})
     .populate('user')
     .populate({
         path: 'comments',
         populate: {
             path: 'user'
         }
     })
     .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
            //Using this posts.user we are fetching the user._id but if we populate it then we can fetch
            //all the details of the user

        });
     })   
    };
    

//module.exports.actionName=function(req, res){};