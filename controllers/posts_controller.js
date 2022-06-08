const POST=require('../models/post');
module.exports.create=function(req, res){
    POST.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('Error in creating the post');
            return;
        }
        // console.log(req.body);
        return res.redirect('back');
    })
}