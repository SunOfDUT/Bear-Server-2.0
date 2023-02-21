var express = require('express');
const req = require('express/lib/request');
var dbOp = require('../bin/opeartion/Userdbopeation')
var router = express.Router();
var multer = require('multer');
// var formidable = require('formidable');
const res = require('express/lib/response');
const path = require('path');
const fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var videOp = require("../bin/opeartion/VideoDbOpeation")

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/uploadimage');
    },
    filename:(req,file,cb)=>{
        let extname = path.extname(file.originalname);
        cb(null,`${file.fieldname}-${Date.now()}${extname}`);
    }
})

let upload = multer({storage:storage})

router.get('/',function(req,res,next){
    res.send("Welcome to FileManager");
    res.end();
})

router.post('/uploadVideo',upload.single('file'),(req,res)=>{
    console.log(req);
    var desc = req.query.desc;
    var author = req.query.author;
    var video_url = "http://192.168.110.88:3000/" + req.file.path;
    var Music = req.query.Music;
    videOp.InsertVideoData(desc,author,video_url,Music,res);
    res.json({
        'status':"success",

        'msg':"http://127.0.0.1:3000/" + req.file.path
    })
})


router.post('/uploadClientImage',upload.single('file'),(req,res)=>{
    console.log(ChangeMessageName);
    var ChangeMessageName = req.query.ChangeMessageName;
    var PhoneNumber = req.query.PhoneNumber;
    var image_url = "http://192.168.110.88:3000/" + req.file.path;
    dbOp.UpdateClient(ChangeMessageName,image_url,PhoneNumber,res);
})



module.exports = router;