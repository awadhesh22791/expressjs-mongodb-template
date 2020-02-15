var models=require('../models/models.js');
var fields=require('../constant/field.js');
var ColumnName=require('../constant/column_name.js');
var commonRepository=require('./common.js');
var CountryRepository={
    FindAllByDeleted:function(deleted){
        return new Promise(function(resolve,reject){
            models.Country.find({[ColumnName.DELETED]:deleted}).then(existingCountries=>{
                resolve(existingCountries);
            },error=>{
                reject(error);
            }); 
        });
    },
    FindByIdAndDeleted:function(id,deleted){
        return new Promise(function(resolve,reject){
            models.Country.findById(id,{[ColumnName.DELETED]:deleted}).then(existingCountries=>{
                resolve(existingCountries);
            },error=>{
                reject(error);
            }); 
        });
    }
};
Object.assign(CountryRepository,commonRepository);
module.exports=CountryRepository;