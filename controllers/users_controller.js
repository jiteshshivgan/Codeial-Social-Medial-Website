//let say we have a profile page
//export action
module.exports.profile=function(req,res){
    return res.end('<h1>Users Profile</h1>');
};
//Now this action is ready to be access by router and this router is ready to be accessed by browser.