var mongodb = require('mongoose');

var videoModel = new mongodb.Schema({
    'desc':String,
    'author':String,
    'video_url' :String,
    'Music':String,
    'Like':Array, // 喜欢的人
    'Star':Array, // 收藏的人
    'sharecount':Number
})

const Video = mongodb.model('VideoData',videoModel);

module.exports = ({
    Video,
    videoModel
})