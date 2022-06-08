const { UserInfo } = require('git');
const { model } = require('mongoose');
const passport = require('passport');
const User =require('../models/user');

const LocalStrategy = require('passport-local').Strategy;
// variable name is written in above format because passport.js suggest it  

//sign in
//authentication of user using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
//callback function
function(email, password, done){
    //done function is a callback function which is reporting back to passport function
    //find a user and establish the identity.
    console.log('Entered the passport function');
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding the user ---> Passport');
            return done(err);
            //If any function needs two argument but it is javascript so it can run on one argument too.
            //This will report an error to passport.
        }
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null, false);
            // false means authentification is not done 
        }
        //done function is the callback function
        console.log('Authentication is done');
        return done(null, user);
        
    });
}

));




//Serializing the user to decide which key is to be kept in the cookies
//When the user sign in, we find the id of the user and send it to the cookie and the cookie is send to the browser
passport.serializeUser(function(user, done){
    done(null, user.id);
    //This automatically encrypt the user.id
});


//Browser send the request so we deserialise it.
//deserializing the user from the key in the cookies. #decoding 
//picking up id from session cookie and converting into a user by finding in the database
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user ---->because of Passport');
            return done(err);
        }
        return done(null, user);
        //null because no error is there and user because user is found        
    });
    //This automatically encrypt the user.id
});

//Check if the user is authenticated
//Generally used as middleware and passed it to the routes because it have req, res, next
passport.checkAuthentication=function(req, res, next){
    //If the user is signed in then pass on the request to the next function controller's action
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in 
    return res.redirect('/users/sign-in');
}


// If the user is not authenticated then take him to the signed in page 
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.users contains the currect signed in user from the session cookie
        //We are just sending this details to the locals for the views
        res.locals.user=req.user;
        console.log(res.locals.user._id);
    }
    //pass on the control to the next function
    next();
}




module.exports=passport;