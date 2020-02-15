var nodemailer=require('nodemailer');
var config=require('../constant/config.js');
var vash=require('vash');
var field=require('../constant/field.js');

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:config.MAILER_USERNAME,
        pass:config.MAILER_PASSWORD
    }
});

module.exports={
    SendHTMLEmail:function(toEmail,subject,message){
        return new Promise(function(resolve,reject){
            transporter.sendMail({
                from:config.FROM_EMAIL,
                to:toEmail,
                subject:subject,
                html:message
            }, function(error, info){
                if (error) {
                  reject(error);
                } else {
                  resolve(info.response);
                }
              });
        });
    },
    SendTestHTMLEmail:function(toEmail,subject,message){
        var template=vash.compile('<p>Hi @model.name,</p><p>@model.message</p><p>Regards,<br/><b>@model.company_name</b></p>');
        var body=template({[field.NAME]:'Awadhesh',
                    [field.MESSAGE]:message,
                    [field.COMPANY_NAME]:'Template corp'});
        return this.SendHTMLEmail(toEmail,subject,body);
    },
    SendTextEmail:function(toEmail,subject,message){
        return new Promise(function(resolve,reject){
            transporter.sendMail({
                from:config.FROM_EMAIL,
                to:toEmail,
                subject:subject,
                text:message
            }, function(error, info){
                if (error) {
                  reject(error);
                } else {
                  resolve(info.response);
                }
              });
        });
    }
};