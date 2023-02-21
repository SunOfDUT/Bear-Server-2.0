const res = require('express/lib/response');
var mongodb = require('mongoose');
const db_url = "mongodb://localhost:27017/bearServer"

mongodb.connect(
    'mongodb://localhost:27017/bearServer',
    {
        useNewUrlParser:true
    },
    (err)=>{
        if(err){
            console.log(err)
            return
        }
        console.log("数据库连接成功")
    }
);

mongodb.connection.on('error',function(err){
    console.log("连接错误 :",err);
})

mongodb.connection.on('disconnection',function(){
    console.log('断开连接');
})

module.exports ={
    mongodb,
};