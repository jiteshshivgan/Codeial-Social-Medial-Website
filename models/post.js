const mongoose = require('mongoose');
const User=require('./user');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        //link it to user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the id's of all the comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }

    ]

    
},{
        //timestamp create two new columns created at, updated at
        timestamps: true 
    
});
//We need to tell that this is going to be model in the database
const Post= mongoose.model('Post', postSchema);
module.exports=Post;