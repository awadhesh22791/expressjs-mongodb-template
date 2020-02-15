var mongoose=require('mongoose');
var config=require('../constant/config.js');
var logger=require('./logger.js');
mongoose.connect(config.DB_URL,{ useNewUrlParser: true },function(error){
    if(error){
        logger.error("Connection failed with database. "+error);
    } else{
        logger.info("Connected with database successfully.");
    }
});
module.exports=mongoose;