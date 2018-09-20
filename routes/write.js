

var express = require('express');

var mysql = require('mysql');
router = express.Router();
var connection = require('../mydb/db')();

  router.get('/write',function (req,res,next) {
    var username=req.body.username;
    res.render('write', {title:'글 쓰기 페이지', username:username});
  });


  // POST 방식의 요청이 들어왔을 때 데이터를 DB에 저장하고 해당하는 DB의 IDX값을
// 가지고 온 후 Read 페이지로 이동
router.post('/write',function (req,res,next) {
    //form 에서 정보를 받아오는것. 
    var username=req.body.username;
    try{
      null.console.error();
      
    }catch(e){

    }
      res.render('write', {title:'글 쓰기 페이지', username: username});

  });
  
  var returnResult = function(err, res) {
    // 결과를 눈으로 보기 쉽게하기 위해 result 객체 생성
    var result = {};
    if (err) {
        res.status(400);
        result.message = err.stack;
    } else {
        res.status(200);
        result.message = "Success";
    }
    return result;
  }
  

  

  module.exports = router;