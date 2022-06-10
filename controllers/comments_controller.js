const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create= function(req, res){
    //We will find the post with that particular post id first and then we need to add comment
    //In home.ejs name is post in which i._id is stored
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log('Error in creating comment');
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    })
}

module.exports.destroy=function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        //Authorization
        // .id means converting the objectId with the string
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            //$pull, Very close to the native mongodb syntax.
            Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
};