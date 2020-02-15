var mongoose=require('../util/db.js');
var TableName=require('../constant/table_name.js');
var ColumnName=require('../constant/column_name.js');
var Country=mongoose.model('country',{
    [ColumnName.NAME]:String,
    [ColumnName.SHORT_NAME]:String,
    [ColumnName.MOBILE_CODE]:String,
    [ColumnName.DELETED]:{type:Boolean,default:false},
    [ColumnName.CREATED_AT]:{ type: Date, default: Date.now },
    [ColumnName.UPDATED_AT]:{ type: Date, default: Date.now }
});
module.exports=Country;