const express=require('express');
//const because we do not want this variable to be over-ridden by anyone in the code
const app=express();
const port =8000;
//When we deploy to live server, it would be port number 80.


//use express router

app.use('/', require('./routes/index'));








app.listen(port, function(err){
    if(err){
        console.log('Error in running the server: ', err);
        //interpolation
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});

//I need to make it GIT repository so that we can track all the changes.