const express=require('express');
const router=express.Router();
const postsController=require('../controllers/posts_controller');

//access the postsController exports
router.post('/create', postsController.create);

module.exports=router;