var logger=require('../util/logger.js');
var format=require('string-format');

var defaultMiddleware = function(req,res){
    logger.info('Hello world!');
};
module.exports=defaultMiddleware;