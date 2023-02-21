const { status } = require('express/lib/response');
var {mongodb}= require('../db')
var {Comment,commentmodel} = require("../dbModel/CommentModel");
var {User, usersModel} = require("../dbModel/UserdbModel");
var {Video,videoModel} = require("../dbModel/VideodbModel")


function SearchClient(MyID,SearchText,res){
    console.log(SearchText);
    var reg = new RegExp(SearchText);
    var _filter = {
    //多字段匹配
        $or: [
            {'username': {$regex: reg}},
            {'uid': {$regex: reg}},
        ]
    }
    User.find(_filter,(err,doc)=>{
        // 返回头像、抖音号、名称、以及粉丝量、ID
        if(doc != null){
            var docata = Object.values(doc);
            var returndata = new Array();
            for(item in docata){
                var object = docata[item].toObject();
                var newdata = {};
               
                newdata['username'] = object.username;
                newdata['uid'] = object.uid;
                newdata['ClientImageUrl'] = object.ClientImageUrl;
                newdata['fanscount'] = object.fansList.length;
                newdata['_id'] = object._id;
                console.log(object.fansList);
                if(object.fansList.filter(value => value.Id == MyID).length == 0){
                    newdata['HasConcern'] = false;
                }else{
                    newdata['HasConcern'] = true;
                }
                returndata[item] = newdata;
            }
            // console.log(doc);
            // delete docdata.password
            res.status(200).json({
                'msg':returndata
            });
            res.end()
        }else{
            res.status(500).json({
                'status':'faliure',
                'msg':'没有该用户',
            })
            res.end()
        }
    })
}

module.exports = {
    SearchClient,
}

                // delete object.sex;
                // delete object.CreateDate;
                // delete object.LikeCount;
                // delete object.school;
                // delete object.password;
                // delete object.BackGroundImageUrl;
                // delete object.introduce;
                // delete object.location;
                // delete object.bornDate;
                // delete object.FriendList;
                // delete object.OweVideoList;
                // delete object.LikeVideoList;
                // delete object.StarVideoList;
                // delete object.concernList;
                // delete object.fansList;
                // delete object.__v;
                // delete object.phoneNumber;
                // returndata.push(object);