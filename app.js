var express=require("express");
var bodyparser=require('body-parser');
var formData = require("express-form-data");
var os = require("os");
var morgan=require('morgan');
var countryRouter=require('./controller/country.js');
var authenticationRouter=require('./controller/authentication.js');
var defaultMiddleware=require('./middleware/defaultMiddleware.js');
var config=require('./constant/config.js');
var logger=require('./util/logger.js');
var app=express();
var port=8080;
var options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// change file objects to stream.Readable 
app.use(formData.stream());
// union body and files
app.use(formData.union());
app.use(bodyparser.json());
app.use(morgan(config.PROFILE));
app.use(function(req,res,next){
    defaultMiddleware(req,res);
    next();
});
app.get("/",function(req,res){
    res.send("Hello World");
});
//Register routers
app.use('/country',countryRouter);
app.use('/authenticate',authenticationRouter);
//Register routers

app.listen(port,function(){
    logger.info('Server running on port '+port+'.');
});