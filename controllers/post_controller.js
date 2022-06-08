const POST=require('../models/post');
module.exports.post= function(req, res){
    console.log(req.body);
    POST.findById()
    return res.redirect('/');
}