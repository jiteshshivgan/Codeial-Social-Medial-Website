//Now this index.js is my entry point to all the routes
//express.router is a module that helps to separate my app and router.
const express=require('express');
//this express is just an instance 
const route = express.Router();
const homeController=require('../controllers/home_controller');


//To check whether index.js loaded this router file
console.log('router loaded');

//access controller function here
route.get('/', homeController.home);

//Any request comes to / with users appended to it will be transfered to users.js
route.use('/users',require('./users'));
route.use('/posts', require('./posts'));

//route.use('/routerName', require('routerFile'));

//I need to export this to be available to index.js
module.exports = route;