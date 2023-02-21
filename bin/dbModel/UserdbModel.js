var mongodb = require('mongoose');

var usersModel = new mongodb.Schema({
    'username':String, // 名称
    'password':String, // 密码
    'CreateDate':Date, // 注册时间
    'phoneNumber':String, // 绑定手机号
    'ClientImageUrl':String, // 自己的头像
    'BackGroundImageUrl':String,// 自己的背景图 
    'introduce':String, // 自己的介绍
    'sex':String,  // 自己的性别
    'location':String, // 自己的地点
    'bornDate':Date, //自己的出生日期
    'school':String, //自己的学校
    'LikeCount':Number, // 收到的赞
    'FriendList':Array, // 朋友列表ID
    'OweVideoList':Array,  // 自己发表的视频ID
    'LikeVideoList':Array, // 喜欢的视频ID
    'StarVideoList':Array, // 收藏的视频ID
    'concernList':Array, //关注列表
    'fansList':Array, //粉丝列表
    'uid':String,
}) 

const User = mongodb.model('user',usersModel);

module.exports = {
    User,
    usersModel,
}