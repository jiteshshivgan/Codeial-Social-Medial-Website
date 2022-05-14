//Now this index.js is my entry point to all the routes
//express.router is a module that helps to separate my app and router.
const express=require('express');
//this express is just an instance 
const router = express.Router();
const homeController=require('../controllers/home_controller');
const postController=require('../controllers/post_controller');

//To check whether index.js loaded this router file
console.log('router loaded');

//access controller function here
router.get('/', homeController.home);
router.get('/post', postController.post);

//I need to export this to be available to index.js
module.exports = router;