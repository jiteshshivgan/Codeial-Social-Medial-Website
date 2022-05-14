const express=require('express');

const router=express.Router();


const usersController = require('../controllers/users_controller'); 

router.get('/profile', usersController.profile);


//now i need to access users_controller from this route


//Access post controller
const postController=require('../controllers/post_controller');

router.get('/post', postController.post);

module.exports=router;