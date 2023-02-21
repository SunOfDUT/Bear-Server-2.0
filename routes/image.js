var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const dir_name = 'public/images'

router.get('/uploadimage/*',function(req,res){
    console.log('/Users/corleone/Desktop/Bear-Server 2.0/'+ dir_name + req.url)
    res.sendFile('/Users/corleone/Desktop/Bear-Server 2.0/'+ dir_name + req.url,(err)=>{
        console.log(err)
    });
})

module.exports = router;