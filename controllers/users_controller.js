//let say we have a profile page
//export action
module.exports.profile=function(req,res){
    return res.render('users', {
        title: 'Profile'
    });
};
//Now this action is ready to be access by router and this router is ready to be accessed by browser.