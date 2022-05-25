// create a schema 
const mongoose =require('mongoose');

// schema of the user
const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
} ,{

timestamps: true

});

// Telling mongoose this is the model
const User = mongoose.model('User', userSchema);

// export it
module.exports =User;