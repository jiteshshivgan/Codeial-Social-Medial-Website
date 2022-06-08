//I need to export a function which is publically available to my routes file
module.exports.home=function(req, res){
    //res.render('html.ejs file you want to render', {
    //     data you want to send with it
    // })
    return res.render('home', {
        title: "Home Page"
    });
}
//module.exports.actionName=function(req, res){};