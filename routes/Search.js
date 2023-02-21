var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
var SearchOp = require('../bin/opeartion/SearchOpeation');


router.get('/searchClient',(req,res)=>{
    var searchText = req.query.searchText;
    var MyID = req.query.MyID
    SearchOp.SearchClient(MyID,searchText,res);
})

module.exports = router;