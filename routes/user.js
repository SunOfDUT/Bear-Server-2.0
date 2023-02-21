var express = require('express');
var dbOp = require('../bin/opeartion/Userdbopeation')
const { runOnChangeOnly } = require('nodemon/lib/config/defaults');
var router = express.Router();
var tencentserver = require('../bin/tencentServer')
var mongodb= require('../bin/db')
var {User,usersModel} = require("../bin/dbModel/UserdbModel");



/* GET users listing. */
router.get('/',function(req,res,next){
    res.send("Welocome to user");
    res.end()
})

// 获取user的信息
router.get('/GetUserWithUsername', function(req, res, next) {
  const username = req.query.username;
  dbOp.FindUserWithUsername(username,res);
});


router.get('/AddConcern',function(req, res){
  var MyID = req.query.MyID;
  var ConcernObjectID = req.query.ConcernObjectID;
  dbOp.AddConcern(MyID,ConcernObjectID,res);
})

// 获取user的信息
router.get('/GetUserWithId', function(req, res, next) {
  const id = req.query.ID;
  dbOp.FindUserWithId(id,res);
});

router.get('/GetFansListDetial', function(req, res, next) {
  // 获取关注我的人 新朋友
  const MyID = req.query.MyID;
  dbOp.GetFansListDetial(MyID,res);
});

router.get('/GetFriendListDetial', function(req, res, next) {
  // 获取我的好友列表
  const MyID = req.query.MyID;
  dbOp.GetFriendListDetial(MyID,res);
});


router.get('/SignIn',function(req,res,next){
  const username = req.query.username;
  const password = req.query.password;
  dbOp.SignIn(username,password,res);
})

router.get('/SignInMessageVerify',function(req,res,next){
  var PhoneNumber = req.query.PhoneNumber
  dbOp.FindUserWithPhoneNumber(PhoneNumber,res);
})

router.get('/SignInWithMessage',function(req,res,next){
  var PhoneNumber = req.query.PhoneNumber
  User.findOne({phoneNumber:PhoneNumber},(err,doc)=>{
    if(doc == null){
      tencentserver.SignUpsendMessage(PhoneNumber,res);
    }else{
      tencentserver.SignInsendMessage(PhoneNumber,res);
    }
  })
})

router.get('/SignUp',function(req,res,next){
  const phoneNumber = req.query.phoneNumber
  User.findOne({phoneNumber:phoneNumber},(err,doc)=>{
    if(doc != null){
        res.json({
            'status':'faliure',
            'msg':'该手机号已经绑定了其他用户',
        })
        res.end()
    }else{
        dbOp.SignUp(phoneNumber,res);
    }
  })
})


router.get('/resetpasswordVerify',function(req,res,next){
  var PhoneNumber = req.query.PhoneNumber;
  User.findOne({phoneNumber:PhoneNumber},(err,doc)=>{
    if(doc == null){
        res.json({
            'status':'faliure',
            'msg':'该手机号没有绑定任何用户',
        })
        res.end()
    }else{
      tencentserver.ReSetsendMessage(PhoneNumber,res);
    }
  })
})

router.get('/resetpassword',function(req,res){
  const PhoneNumber = req.query.PhoneNumber;
  const newpassword = req.query.newpassword;
  dbOp.ReSetPassword(PhoneNumber,newpassword,res);
})

router.get('/ChangeClientMessage',function(req,res){
  const ChangeMessageName = req.query.ChangeMessageName;
  const ChangeContend = req.query.ChangeContend;
  const PhoneNumber = req.query.PhoneNumber;
  dbOp.UpdateClient(ChangeMessageName,ChangeContend,PhoneNumber,res);
})


module.exports = router;
