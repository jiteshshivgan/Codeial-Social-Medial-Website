const express=require('express');
const router=express.Router();
const postsController=require('../controllers/posts_controller');
const passport=require('passport');
//access the postsController exports
//This is the second check below using passport.checkAuthentication, now if the user try to create a form 
//in the inspect and submit it. He will not be able to do so as he is not authenticated.
router.post('/create',passport.checkAuthentication, postsController.create);

module.exports=router;