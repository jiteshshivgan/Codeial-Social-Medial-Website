const express=require('express');
const router=express.Router();
const commentsController=require('../controllers/comments_controller');
const passport=require('passport');
//access the commentsController exports
//This is the second check below using passport.checkAuthentication, now if the user try to create a form 
//in the inspect and submit it. He will not be able to do so as he is not authenticated.
router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);
module.exports=router;