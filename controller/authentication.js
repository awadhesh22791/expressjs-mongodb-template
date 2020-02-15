var express=require('express');
const { check, validationResult } = require('express-validator/check');
var statics=require('../constant/static.js');
var messages=require('../constant/message.js');
var codes=require('../constant/code.js');
var authenticationService=require('../service/authentication.js');
var authenticationValidator=require('../validator/authentication.js');
var router=express.Router();

router.post('/',[
    check('username').isLength({ min:1,max: 45 }).withMessage('Length of user name must be of 1 to 45.'),
    check('password').isLength({ min:1,max: 45 }).withMessage('Length of password must be of 1 to 45.')
],function(req,res){
    var errors = validationResult(req);
    if(errors.array().length==0){
        var credentials=req.body;
        var result=authenticationValidator.validateCredentials(credentials);
        var token=authenticationService.validateUser(credentials.user_name,credentials.password);
        if(token){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:null});
        }else{
            res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
        }
    }else{
        res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.INVALID_DATA,data:errors.array()});
    }
});

router.post('/logout',function(req,res){
    authenticationService.logout();
    res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.LOGOUT_SUCCESS,data:null});
});

module.exports=router;