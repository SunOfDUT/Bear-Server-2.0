const { status } = require('express/lib/response');
var {mongodb}= require('../db')
var {Comment,commentmodel} = require("../dbModel/CommentModel");



function addComment(VideoId,CommentName,WasCommentName,Message,loaction,IsMainComment,LeverUpCommentId,res){
    var newComment = new Comment({
        VideoId:VideoId,
        CommentName:CommentName,
        WasCommentName:WasCommentName,
        Message:Message,
        Like:[],
        CreateDate:Date(),
        loaction:loaction,
        IsMainComment:IsMainComment,
        LeverUpCommentId:LeverUpCommentId,
        LeverdownCommentCount:0,
    })

    if(LeverUpCommentId != ""){
        console.log("ds");
        Comment.findOne({_id:LeverUpCommentId},(err,doc)=>{
            if(err){
               
            }else{
                Comment.updateOne({_id:LeverUpCommentId},{LeverdownCommentCount:doc.LeverdownCommentCount+1},(err2,doc2)=>{
                    if(err2){
                        
                    }else{
                        newComment.save((err3,doc3)=>{
                            if(err3){
                              
                            }else{
                                res.json({
                                    msg:doc3
                                })
                                res.end()
                            }
                        });
                    }
                })
            }
        })
    }else{
        console.log("ddss");
        newComment.save((err,doc)=>{
            if(err){
               
            }else{
                res.json({
                    msg:doc
                })
                res.end()
            }
        });
    }
}

function DeleteComment(CommentId,res){
    Comment.deleteOne({_id:CommentId},(err,doc)=>{
        if(err){
            res.json({
                status:"faliure",
                msg:"删除失败"
            })
        }else{
            res.json({
                status:"success",
                msg:"删除成功"
            })
        }
    })
}

function GetMainCommentList(VideoId,res){
    // 首先获取主要list
    Comment.find({VideoId:VideoId},(err,doc)=>{
        const value = Object.values(doc);
        const MainComment = value.filter(value => value.IsMainComment == true);
        MainComment.sort(function(v1,v2){
        if(v1.Like.length == v2.Like.length){
            return v2.CreateDate - v1.CreateDate;
        }else{
            return v2.Like.length - v1.Like.length;
        }
        });
        if(err){
            res.json({
                'data':[],
            })
        }else{
            res.json({
                'data':MainComment,
            })
        }
    })
}

function GetSecondCommentList(MainCommentId,limit,startLocation,res){
    // 首先二级评论列表  LeverUpCommentId都等于主评论id
    Comment.find({LeverUpCommentId:MainCommentId},(err,doc)=>{
        const value = Object.values(doc);
        const newvalue = new Array();
        // 如果有limit获取限制 且我们知道从哪开始
        value.sort(function(v1,v2){
            if(v1.Like.length == v2.Like.length){
                return v2.CreateDate - v1.CreateDate;
            }else{
                return v2.Like.length - v1.Like.length;
            }
        });
        console.log(value);
        if(limit){
           for(var i = startLocation;i<startLocation+limit;i++){
               if(i < value.length){
                    newvalue.push(value[i]);
               }
           }
        }else{
            newvalue = value;
        }
        if(err){
            res.json({
                data:[],
            })
        }else{
            res.json({
                data:newvalue,
            })
        }
    })
}


function LikeComment(CommentId,likeId,res){
  Comment.findById({_id:CommentId},(err,doc)=>{
      if(err){
        res.json({
            status:"faliure",
            msg:"喜欢失败"
        })
      }else{
        console.log(doc.Like.filter(value => value == likeId));
        if(doc.Like.filter(value => value == likeId).length == 0){
            console.log(likeId);
            console.log(doc.Like);
            console.log(doc.Like.push(likeId));
            console.log(doc.Like);
            Comment.updateOne({_id:CommentId},{Like:doc.Like},(err2,doc2)=>{
                  if(err2){
                      res.json({
                          status:"faliure",
                          msg:"喜欢失败"
                      })
                  }else{
                      res.json({
                          status:"success",
                          msg:"喜欢成功"
                      })
                     
                  }
            })
        }else{
            res.json({
                status:"faliure",
                msg:"您已经喜欢过咯"
            })
        };         
      }
  })
}

function DeleteLikeComment(CommentId,likeId,res){
    Comment.findById({_id:CommentId},(err,doc)=>{
        if(err){
          console.log(err);
          res.json({
              status:"faliure",
              msg:"删除失败"
          })
        }else{
          console.log(doc.Like.filter(value => value == likeId));
          if(doc.Like.filter(value => value == likeId).length == 0){
            res.json({
                status:"faliure",
                msg:"已经删除"
            })
          }else{
              console.log(likeId);
              console.log(doc.Like.filter(value => value != likeId));
              Comment.updateOne({_id:CommentId},{Like:doc.Like.filter(value => value != likeId)},(err2,doc2)=>{
                    if(err2){
                        res.json({
                            status:"faliure",
                            msg:"删除失败"
                        })
                    }else{
                        res.json({
                            status:"success",
                            msg:"删除成功"
                        })
                    }
              })
          };         
        }
    })
}

module.exports = {
    addComment,
    GetMainCommentList,
    GetSecondCommentList,
    LikeComment,
    DeleteComment,
    DeleteLikeComment
}