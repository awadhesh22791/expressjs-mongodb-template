var express=require('express');
const { check, validationResult } = require('express-validator/check');
var format=require('string-format');
var logger=require('../util/logger.js');
var statics=require('../constant/static.js');
var messages=require('../constant/message.js');
var codes=require('../constant/code.js');
var fields=require('../constant/field.js');
var countryService=require('../service/country.js');
var emailService=require('../service/email.js');
var router=express.Router();

router.post('/create',[
    check([fields.NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARACTER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,fields.NAME,statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARACTER_LENGTH)),
    check([fields.SHORT_NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARACTER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,fields.SHORT_NAME,statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARACTER_LENGTH)),
    check([fields.MOBILE_CODE]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: 4 }).withMessage(format(messages.INVALID_LENGTH,fields.MOBILE_CODE,statics.DEFAULT_MIN_CHARACTER_LENGTH,4))
],function(req,res){
    var errors = validationResult(req);
    if(errors.array().length==0){
        countryService.Create(req.body).then(function(result){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_SAVED,data:null});
        },function(error){
            logger.error(messages.SERVER_ERROR+' '+error);
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_NOT_SAVED,data:null});
        });
    }else{
        res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.INVALID_DATA,data:errors.array()});
    }
});

router.post('/:id/update',[
    check([fields.NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARACTER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARACTER_LENGTH)),
    check([fields.SHORT_NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARACTER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.SHORT_NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARACTER_LENGTH)),
    check([fields.MOBILE_CODE]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: 4 }).withMessage(format(messages.INVALID_LENGTH,[fields.MOBILE_CODE],statics.DEFAULT_MIN_CHARACTER_LENGTH,4))
],function(req,res){
    var errors = validationResult(req);
    if(errors.array().length==0){
        countryService.Update(req.params[fields.ID],req.body).then(function(result){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_SAVED,data:null});
        },function(error){
            logger.error(messages.SERVER_ERROR+' '+error);
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_NOT_SAVED,data:null});
        });
    }else{
        res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.INVALID_DATA,data:errors.array()});
    }
});

router.get('/:id',function(req,res){
    var countries=countryService.GetCountry(req.params.id);
    countries.then(function(result){
        if(result){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:result});
        }else{
            res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
        }
    },function(error){
        logger.error(messages.SERVER_ERROR+' '+error);
        res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
    });
});

router.get('/',function(req,res){
    var countries=countryService.GetAllCountry();
    countries.then(function(result){
        res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:result});
    },function(error){
        logger.error(messages.SERVER_ERROR+' '+error);
        res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
    });
});

router.post('/:id/saveFlag',function(req,res){
    logger.info(req.files.flag[0].path);
    res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
});

module.exports=router;