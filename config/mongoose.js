const mongoose =require('mongoose');

//provide connection to database
//mongoose.connect('mongodb://localhost because we are seting up the database on our own local /system/codial_development because right now we are on development phase);
//right now we're at development stage.
//There are different environment in the larger companies
// 1. Development environment
// 2.Test environment
// 3. Production environment
mongoose.connect('mongodb://localhost/codial_development');
const db=mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//If we get connected to database
db.once('open', function(){
    console.log('Connected to database: MongoDB')
});

//To make this module usable
module.exports=db;