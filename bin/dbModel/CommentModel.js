var mongodb = require('mongoose');

var commentmodel = new mongodb.Schema({
    'VideoId':String,
    'CommentName':String, //评论人的名称
    'WasCommentName':String,//被评论人的名称
    'Message':String, // 评论的内容
    'Like':Array(String), // 喜欢的人
    'CreateDate':Date, // 创建时间
    'loaction':String, // 评论ip
    'IsMainComment':Boolean,//是否为一级评论
    'LeverUpCommentId':String, //上一级评论Id
    'LeverdownCommentCount':Number //下一级评论个数
});
const Comment = mongodb.model('commentData',commentmodel);

module.exports ={
    Comment,
    commentmodel,
}
