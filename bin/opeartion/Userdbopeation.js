const { status } = require('express/lib/response');
var {mongodb}= require('../db')
var {User, usersModel} = require("../dbModel/UserdbModel");
const { getVerCode } = require('../tencentServer');

function FindUserWithUsername(username,res){
    User.findOne({username:username},(err,doc)=>{
        if(doc != null){
            var docdata = doc.toObject();
            delete docdata.password
            res.json({
                'msg':docdata
            });
            res.end();
        }else{
            res.json({
                'status':'faliure',
                'msg':'没有该用户',
            })
            res.end()
        }
    })
}

function FindUserWithId(Id,res){
    User.findOne({_id:Id},(err,doc)=>{
        if(doc != null){
            var docdata = doc.toObject();
            delete docdata.password
            res.json({
                'msg':docdata
            });
            res.end()
        }else{
            res.json({
                'status':'faliure',
                'msg':'没有该用户',
            })
            res.end()
        }
    })
}

function FindUserWithPhoneNumber(phoneNumber,res){
    User.findOne({phoneNumber:phoneNumber},(err,doc)=>{
        if(doc != null){
            var docdata = doc.toObject();
            delete docdata.password;
            delete docdata.OweVideoList;
            delete docdata.StarVideoList,
            delete docdata.LikeVideoList,
            res.json({
                'status':'success',
                'msg':docdata
            });
            res.end()
        }else{
            res.json({
                'status':'faliure',
                'msg':null,
            })
            res.end()
        }
    })
}

function SignIn(username,password,res){
    User.findOne({phoneNumber:username},(err,doc)=>{
        if(doc != null){
            var docdata = doc.toObject();
            if(doc.password == password){
                delete docdata.password;
                delete docdata.OweVideoList;
                delete docdata.StarVideoList,
                delete docdata.LikeVideoList,
                console.log(docdata);
                res.json({
                    'status':'登陆成功',
                    'msg':docdata
                });
                res.end()
            }else{
                res.json({
                    'status':'密码错误',
                    'msg':null,
                })
                res.end()
            }
        }else{
            res.json({
                'status':'用户名不存在',
                'msg':null,
            })
            res.end()
        }
    })
}


function SignUp(phoneNumber,res){
    var newuser = new User({
        username:getVerCode(),
        password:getVerCode(),
        CreateDate:Date(),
        phoneNumber:phoneNumber,
        FriendList:[],
        OweVideoList:[],
        StarVideoList:[],
        LikeVideoList:[],
        ClientImageUrl:"http://192.168.110.88:3000/public/images/uploadimage/img_find_default@2x.png",
        BackGroundImageUrl:"http://192.168.110.88:3000/public/images/uploadimage/splash_ad_x.png",
        introduce:"",
        sex:"",
        location:"",
        bornDate:null,
        school:"",
        LikeCount:0,
        fansList:[],
        concernList:[],
        uid:getVerCode(),
    })
    
    newuser.save((err,doc)=>{
        if(err){
            res.json({
            'status':'服务器繁忙',
            'msg':null
            })
           res.end();
          return;
        }else{
           
            var docdata = doc.toObject();
            delete docdata.password;
            delete docdata.OweVideoList;
            delete docdata.StarVideoList,
            delete docdata.LikeVideoList,
            res.json({
                'status':'success',
                'msg':docdata
            })
            res.end();
          return;
        }
    })
}


function ReSetPassword(PhoneNumber,newpassword,res){
    console.log(PhoneNumber)
    console.log(newpassword)
   User.updateOne({phoneNumber:PhoneNumber},{password:newpassword},(err,doc)=>{
       if(doc.matchedCount == 0){
           res.json({
               'status':"failure",
               'msg':"修改失败"
           })
           res.end()
       }else{
           res.json({
               'status':"success",
               'msg':"修改成功"
           })
           res.end()
       }
       console.log(doc)
    })
}

function UpdateClient(ChangeMessageName,ChangeContend,PhoneNumber,res){
    console.log(ChangeContend);
    console.log(PhoneNumber);
    switch(ChangeMessageName){
        case "username":
            User.updateOne({phoneNumber:PhoneNumber},{username:ChangeContend},(err,doc)=>{
                if(doc.matchedCount == 0){
                    res.json({
                        'status':"failure",
                        'msg':"修改失败"
                    })
                    res.end()
                }else{
                    res.json({
                        'status':"success",
                        'msg':"修改成功"
                    })
                    res.end()
                }
            })
            break;
        case "ClientImageUrl":
          
            User.updateOne({phoneNumber:PhoneNumber},{ClientImageUrl:ChangeContend},(err,doc)=>{

                if(doc.matchedCount == 0){
                    res.json({
                        'status':"failure",
                        'msg':"修改失败"
                    })
                    res.end()
                }else{
                    res.json({
                        'status':"success",
                        'msg':ChangeContend
                    })
                    res.end()
                }
            })
            break;
        case "BackGroundImageUrl":
            User.updateOne({phoneNumber:PhoneNumber},{BackGroundImageUrl:ChangeContend},(err,doc)=>{
                if(doc.matchedCount == 0){
                    res.json({
                        'status':"failure",
                        'msg':"修改失败"
                    })
                    res.end()
                }else{
                    res.json({
                        'status':"success",
                        'msg':ChangeContend
                    })
                    res.end()
                }
            })
            break;
        case "introduce":
                User.updateOne({phoneNumber:PhoneNumber},{introduce:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "sex":
                User.updateOne({phoneNumber:PhoneNumber},{sex:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "location":
                User.updateOne({phoneNumber:PhoneNumber},{location:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "bornDate":
                
                if(ChangeContend == undefined){
                    ChangeContend = null;
                }
                console.log(ChangeContend);
                User.updateOne({phoneNumber:PhoneNumber},{bornDate:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "school":
                User.updateOne({phoneNumber:PhoneNumber},{school:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "LikeCount":
                User.updateOne({phoneNumber:PhoneNumber},{LikeCount:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "FriendList":
                User.updateOne({phoneNumber:PhoneNumber},{FriendList:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
            })
            break;
        case "OweVideoList":
                User.updateOne({phoneNumber:PhoneNumber},{OweVideoList:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "LikeVideoList":
                User.updateOne({phoneNumber:PhoneNumber},{LikeVideoList:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "StarVideoList":
                User.updateOne({phoneNumber:PhoneNumber},{StarVideoList:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "concernList":
                User.updateOne({phoneNumber:PhoneNumber},{concernList:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        case "fansList":
                User.updateOne({phoneNumber:PhoneNumber},{fansList:ChangeContend},(err,doc)=>{
                    if(doc.matchedCount == 0){
                        res.json({
                            'status':"failure",
                            'msg':"修改失败"
                        })
                        res.end()
                    }else{
                        res.json({
                            'status':"success",
                            'msg':"修改成功"
                        })
                        res.end()
                    }
             })
             break;
        default:
            //uid
            User.updateOne({phoneNumber:PhoneNumber},{uid:ChangeContend},(err,doc)=>{
                if(doc.matchedCount == 0){
                    res.json({
                        'status':"failure",
                        'msg':"修改失败"
                    })
                    res.end()
                }else{
                    res.json({
                        'status':"success",
                        'msg':"修改成功"
                    })
                    res.end()
                }
            })
            break;
    }
}

function AddConcern(MyID,ConcernObjectID,res){
    User.findOne({'_id':MyID},(err,doc)=>{
        console.log(doc.concernList);
     if(err){
        
          res.json({
              status:"faliure",
              msg:"关注失败"
          })
          return;
    }else{
        if(doc.concernList.filter(value => value.Id == ConcernObjectID).length == 0){
            // 如果当前的doc关注列表里没有关注人的名字 代表没有关注
            var newobject = {};
            newobject.Id = ConcernObjectID;
            newobject.CreateDate = Date();
            console.log(doc.concernList.push(newobject));
            User.updateOne({'_id':MyID},{'concernList':doc.concernList},(err2,doc2)=>{
                if(err2){
                  
                    res.json({
                        status:"faliure",
                        msg:"关注失败"
                    })
                    return;
                }else{
                    User.findOne({'_id':ConcernObjectID},(err,doc3)=>{
                        if(err){
                            
                             res.json({
                                 status:"faliure",
                                 msg:"关注失败"
                             })
                             return;
                           }else{
                               
                            if(doc3.fansList.filter(value => value.Id == MyID).length == 0){
                                // 如果当前被关注人的粉丝列表中没有自己的名字 代表还没有加入粉丝
                                var newobject2 = {}
                                newobject2.Id = MyID;
                                newobject2.CreateDate = Date();
                                console.log(doc3.fansList.push(newobject2));
                               User.updateOne({'_id':ConcernObjectID},{'fansList':doc3.fansList},(err2,doc2)=>{
                                       if(err2){
                                        
                                           res.json({
                                               status:"faliure",
                                               msg:"关注失败"
                                           })
                                       }else{
                                        CheckFriendList(MyID,ConcernObjectID);
                                           res.json({
                                               status:"success",
                                               msg:"关注成功"
                                           })
                                           
                                       }
                               })    
                           }else{
                            
                               // 代表当前关注的人已经把自己加入粉丝了
                           }
                        }
                       })
                }
        })   
          }else{
              // 代表了当前想要关注的人已经关注过了 
              res.json({
                  status:"faliure",
                  msg:"您已经关注过了"
              })
          };     
        }
    })
    CheckFriendList(MyID,ConcernObjectID);
}

function CheckFriendList(MyID,ObjectID){
    User.findOne({'_id':MyID},(err,doc)=>{
        if(!err){
            console.log(doc.fansList);
            console.log(doc.concernList);
            if((doc.fansList.filter(value => value.Id == ObjectID).length != 0) && (doc.concernList.filter(value => value.Id == ObjectID).length != 0) && (doc.FriendList.filter(value => value.Id == MyID).length == 0)){
                // 代表它是我的朋友了
                console.log(12)
                var newobject2 = {}
                newobject2.Id = ObjectID;
                newobject2.CreateDate = Date();
                doc.FriendList.push(newobject2);
                User.updateOne({'_id':MyID},{'FriendList':doc.FriendList},(err,doc)=>{
                    if(err){
                        console.log(err)
                    }else{
                        
                    }
                });
            }
        }
    })

    User.findOne({'_id':ObjectID},(err,doc)=>{
        if(!err){
            console.log(doc.fansList);
            console.log(doc.concernList);
            if((doc.fansList.filter(value => value.Id == MyID).length != 0) && (doc.concernList.filter(value => value.Id == MyID).length != 0) && (doc.FriendList.filter(value => value.Id == ObjectID).length == 0)){
                // 代表它是我的朋友了
                console.log(12)
                var newobject2 = {}
                newobject2.Id = MyID;
                newobject2.CreateDate = Date();
                doc.FriendList.push(newobject2);
                User.updateOne({'_id':ObjectID},{'FriendList':doc.FriendList},(err,doc)=>{
                    if(err){
                        console.log(err)
                    }
                });
            }
        }
    })
}




function GetFansListDetial(MyID,res){
    User.find({'_id':MyID},(err,doc)=>{
        // 返回头像、抖音号、名称、以及粉丝量、ID
        if(doc != null){
            var data = doc[0];
            // 获取的是好友列表里面的
            var list = data.fansList;
            var filterdata = new Array();
            for(item in list){
                filterdata.push({'_id':list[item].Id});
            }
            console.log(filterdata);
            var _filter = {
                //多字段匹配
                $or:filterdata
            }
            User.find(_filter,(err,doc2)=>{
                if(doc2 != null){
                    var docata = Object.values(doc2);
                    var returndata = new Array();
                    for(item in docata){
                        var object = docata[item].toObject();
                        var newdata = {};
                        
                        newdata['username'] = object.username;
                        newdata['ClientImageUrl'] = object.ClientImageUrl;

                        newdata['CreateDate'] = GetNormalDate(object.concernList.filter(value => value.Id == MyID)[0].CreateDate)
                        if(object.FriendList.filter(value => value.Id == MyID).length != 0){
                            newdata['isFriend'] = true; 
                        }else{
                            newdata['isFriend'] = false;
                        }
                        returndata[item] = newdata;
                    }
                    res.status(200).json({
                        "msg":returndata
                    });
                    res.end()
                }else{
                    console.log(err);
                }
                // newdata["username"] = doc2.username;
                // newdata["imageurl"] = doc2.ClientImageUrl;
                // newdata["introduce"] = doc2.introduce;
                // returndata[item] = newdata;
                // if(item == list.length - 1){
                   
                // }
            })
           
            // for(item in list){
            //     console.log(list[item]);
            //     
            // }

            
        }else{
            res.status(500).json({
                "msg":null
            })
            res.end()
        }
    })
}

function GetNormalDate(date){
    var date = new Date(date);
    var Y = date.getFullYear() + "-";
    var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

function GetFriendListDetial(MyID,res){
    User.find({'_id':MyID},(err,doc)=>{
        // 返回头像、抖音号、名称、以及粉丝量、ID
        if(doc != null){
            var data = doc[0];
            // 获取的是好友列表里面的
            var list = data.FriendList;
            var filterdata = new Array();
            for(item in list){
                filterdata.push({'_id':list[item].Id});
            }
            console.log(filterdata);
            if(filterdata.length != 0){
                var _filter = {
                    //多字段匹配
                    $or:filterdata
                }
                User.find(_filter,(err,doc2)=>{
                    if(doc2 != null){
                        var docata = Object.values(doc2);
                        var returndata = new Array();
                        for(item in docata){
                            var object = docata[item].toObject();
                            var newdata = {};
                            
                            newdata['username'] = object.username;
                            newdata['Id'] = object._id;
                            newdata['ClientImageUrl'] = object.ClientImageUrl;
                            newdata['introduce'] = object.introduce;
                            returndata[item] = newdata;
                        }
                        res.status(200).json({
                            "msg":returndata
                        });
                        res.end()
                    }else{
                        console.log(err);
                    }
                })
            }else{
                res.status(500).json({
                    "msg":null
                })
                res.end()
            }
            
        }else{
            res.status(500).json({
                "msg":null
            })
            res.end()
        }
    })
}
  

module.exports = {
    SignIn,
    SignUp,
    FindUserWithUsername,
    ReSetPassword,
    FindUserWithPhoneNumber,
    FindUserWithId,
    UpdateClient,
    AddConcern,
    GetFansListDetial,
    GetFriendListDetial,
};