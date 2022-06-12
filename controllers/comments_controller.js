const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req, res){
    //We will find the post with that particular post id first and then we need to add comment
    //In home.ejs name is post in which i._id is stored
    try{
        let post=await Post.findById(req.body.post)
            
        if(post){
                let comment=await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                    
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                    
            }
        
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}

module.exports.destroy=async function(req, res){
        try{
            let comment=await Comment.findById(req.params.id)
            //Authorization
            // .id means converting the objectId with the string
            if(comment.user == req.user.id){
                let postId = comment.post;
                comment.remove();
    
                //$pull, Very close to the native mongodb syntax.
                let post=Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}})
                    return res.redirect('back');
                
            }else{
                return res.redirect('back');
            }   
        }catch(err){
            console.log('Error', err);
        }
    
    
};