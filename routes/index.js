var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req,res){
    res.send("Welocome to Bear-Server 2.0");
    res.end()
});

module.exports = router;
