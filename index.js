const express=require('express');
//const because we do not want this variable to be over-ridden by anyone in the code

const path=require('path');
const port =8000;
const app=express();
//When we deploy to live server, it would be port number 80.
const expressLayouts = require('express-ejs-layouts');
// All the views which are going to be rendered using routes belong to same layouts. 
const db=require('./config/mongoose');
//while requiring our mongoose file this will go and run mongoose.js file.

app.use(express.static('./assets'));

// Tell the app where to look out for assets file.

app.use(expressLayouts);
//use express router

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.use(express.urlencoded());
// app.user('/') yeh path bta rha jo user search karega.
app.use('/',require('./routes'));

//set ejs as our new engine
app.set('view engine', 'ejs');
app.set('views', './views');








app.listen(port, function(err){
    if(err){
        console.log('Error in running the server: ', err);
        //interpolation
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});

//I need to make it GIT repository so that we can track all the changes.