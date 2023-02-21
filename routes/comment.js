var express = require('express');
var router = express.Router();
var CommentOp = require('../bin/opeartion/commentdbOpearion')

router.get('/',function(req,res){
    res.send("welocome to comment");
    res.end();
});

router.get('/post',function(req,res){
    var VideoId = req.query.VideoId;
    var CommentName = req.query.CommentName;
    var WasCommentName = req.query.WasCommentName;
    var Message = req.query.Message;
    var loaction = req.query.loaction;
    var IsMainComment = req.query.IsMainComment;
    var LeverUpCommentId = req.query.LeverUpCommentId;
    CommentOp.addComment(VideoId,CommentName,WasCommentName,Message,loaction,IsMainComment,LeverUpCommentId,res);
});

router.get('/deletecomment',function(req,res){
    var CommentId = req.query.CommentId;
    CommentOp.DeleteComment(CommentId,res);
})

router.get('/MainList',function(req,res){
    var VideoId = req.query.VideoId;
    CommentOp.GetMainCommentList(VideoId,res);
});

router.get('/SecondList',function(req,res){
    var MainCommentId = req.query.MainCommentId;
    var limit = req.query.limit;
    var startLocation = req.query.startLocation;
    CommentOp.GetSecondCommentList(MainCommentId,limit,startLocation,res);
})

router.get('/likecomment',function(req,res){
    var CommentId = req.query.CommentId;
    var likeId = req.query.likeId;
    CommentOp.LikeComment(CommentId,likeId,res);
})

router.get('/deletelikecomment',function(req,res){
    var CommentId = req.query.CommentId;
    var likeId = req.query.likeId;
    CommentOp.DeleteLikeComment(CommentId,likeId,res);
})


module.exports = router
