var {mongodb}= require('../db');
const { User } = require('../dbModel/UserdbModel');
var Async = require('async');
var {Comment,commentmodel} = require("../dbModel/CommentModel");

var {Video,videoModel} = require("../dbModel/VideodbModel")

// 增加
function InsertVideoData(desc,author,video_url,Music,res){
    // 插入数据
    var newvideoModel = new Video({
        desc:desc,
        author:author,
        video_url:video_url,
        Music:Music,
        Like:[],
        Star:[], 
        sharecount:0
    });

    newvideoModel.save((err,doc)=>{
        if(err){
            res.json({
                status:"suceess",
                msg:"上传失败"
            })
        }else{
            res.json({
                status:"suceess",
                msg:"上传成功"
            })
        }
    })
}

function FindAwemeTypeVideoDataById(){
    // 寻找用户的喜欢/收藏的视频
}

//查
function GetAllVideoData(res){
    //获取所有的VideoData
    Video.find((err,doc)=>{
        var docata = Object.values(doc);
        var returndata = new Array();
        var index = 0;
        Async.map(docata,
            function(data, callback) {
                var object = data.toObject();
                var newdata = {};
                newdata['_id'] = object._id;
                newdata['desc'] = object.desc;
                newdata['video_url'] = object.video_url;
                newdata['Music'] = object.Music;
                newdata['likecount'] = object.Like.length;
                newdata['starcount'] = object.Star.length;
                newdata['videoRadio'] = object.videoRadio;
                newdata["author_id"] = object.author;
                newdata["sharecount"] = object.sharecount;
                User.findOne({_id:object.author},(err,user)=>{
                    if(user != null){
                        newdata["username"] = user.username;
                        newdata["ClientImageUrl"] = user.ClientImageUrl;
                    }

                    Comment.find({VideoId:object._id},(err,comments)=>{
                        if(comments != null){
                            var commentdata = Object.values(comments);
                            newdata["commentCount"] = commentdata.length;
                        }
                        callback(null, newdata);
                    })
                    
                })
                
            },
            function(err, results) {
                res.json({
                    'data':results,
                })
                res.end()
                // index += 1;
                // returndata[index] = results;
                // if(index == docata.length-1){
                        
                //  }
                // console.log(results);
                // console.log(index);
            }
        );
        // while(index <= docata.length - 1){
        //     var object = docata[index].toObject();
        //     
        //     console.log(index)
        //     newdata['_id'] = object._id;
        //     newdata['desc'] = object.desc;
        //     newdata['video_url'] = object.video_url;
        //     newdata['Music'] = object.Music;
        //     newdata['likecount'] = object.Like.length;
        //     newdata['starcount'] = object.Star.length;
        //     newdata['videoRadio'] = object.videoRadio;
           
            // User.findOne({_id:object.author},(err,user)=>{
            //     if(user != null){
            //         newdata["username"] = user.username;
            //         newdata["ClientImageUrl"] = user.ClientImageUrl;
            //     }
            //     returndata[index] = newdata;
            //     index += 1;
            //     if(index == docata.length-1){
            //         res.json({
            //             'data':returndata,
            //         })
            //         res.end()
            //     }
            // })
        // }
    });
}

function GetFriendVideoData(){
    //获取所有frinedVideo
}

//删除
function DeleteMyVideoData(){
    //删除自己的Video
}

//修改
function EditMyVideoData(){

}


module.exports = {
    InsertVideoData,
    FindAwemeTypeVideoDataById,
    GetAllVideoData,
    GetFriendVideoData,
    DeleteMyVideoData,
    EditMyVideoData
}