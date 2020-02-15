var service={
    validateUser:function(username,password){
        return false;
    },
    logout:function(){
        console.log("Invalidate token.");
    }
};
module.exports=service;