//I need to export a function which is publically available to my routes file
module.exports.home=function(req, res){
    return res.end('<h1>Express is up for codial</h1>');
}
//module.exports.actionName=function(req, res){};