var CommonRepository={
    Save:function(newModel){
        return new Promise(function(resolve,reject){
            newModel.save().then(function(result){
                resolve(result);
            },function(error){
                reject(error);
            });             
        });
    }
};

module.exports=CommonRepository;