//Import user module
const User=require('../models/user');


//let say we have a profile page
//export action
module.exports.profile=function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('users', {
            title: 'User Profile',
            profile_user: user
        }); 
    })
    
};
//Now this action is ready to be access by router and this router is ready to be accessed by browser.
//This controller will fetch the view and send it to the browser

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        }, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}






//add some more actions
//render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }



    return res.render('user_sign_up', {
        title: 'Codial | Sign up'
    });
}

//render the sign in page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }

    return res.render('user_sign_in', {
        title: 'Codial | Sign in'
    })
}

//get the sign up data
module.exports.create=function(req, res){
    console.log(req.body);
    
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the user in signing up');
            return;
        }

        //It means user is new. So just store the data of the user.
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                console.log('Error in finding the user while signing up');
                return;
                }
                //If error is not there then the user is created. So send the user to sign-in page
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });
}   
        
 




//sign in and create a session for the user
module.exports.createSession =function(req,res){
    //Assuming that user has already signed in then user will be directed to this.
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
   
    //this function is given to request using passport.js
    
};

