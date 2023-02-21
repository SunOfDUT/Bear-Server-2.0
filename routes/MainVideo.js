var express = require('express');
var router = express.Router();
var VideoOp = require('../bin/opeartion/VideoDbOpeation');

router.get("/",function(req,res){
    VideoOp.GetAllVideoData(res);
});

module.exports = router;
