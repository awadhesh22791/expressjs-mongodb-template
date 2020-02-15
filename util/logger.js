var log4js=require('log4js');
//Configure log4js
log4js.configure({
    appenders:{
        out:{type:'stdout'}
    },
    categories:{
        default:{appenders:['out'],level:'all'}
    }
})
//Configure log4js
var logger=log4js.getLogger();

module.exports=logger;