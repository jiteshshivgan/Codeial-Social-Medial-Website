const express=require('express');
const router=express.Router();
const passport=require('passport');

const usersController = require('../controllers/users_controller'); 
const postController = require('../controllers/post_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);


//now i need to access users_controller from this route



router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);
router.post('/post', postController.post);
module.exports=router;