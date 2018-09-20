

var express = require('express');
var mysql = require('mysql');
router = express.Router();
var connection = require('../mydb/db')();


// POST 방식의 요청이 들어왔을 때 데이터를 DB에 저장하고 해당하는 DB의 IDX값을
// 가지고 온 후 Read 페이지로 이동합니다.

router.post('/modify2', function (req,res,next) {
    //form 에서 정보를 받아오는것. 
    //var body = req.body;
    var idx = req.body.idx;
    var title = req.body.title;
    var content = req.body.content;
    var username=req.body.username;


    connection.beginTransaction(function(err){
      //json으로 결과값을 보기위해서 이 코드를 이용한다
           // var result = returnResult(err, res);
        if(err) console.log(err);
        var sql='UPDATE board SET title=?, content=?, moddate=DATE_FORMAT(moddate, "%Y/%m/%d %T") where idx=?';
        connection.query(sql, [title, content, idx], function(err, result, field){
          
            if(err){
                console.log(err);
                connection.rollback(function(){
                console.error('rollback error1');
                });
            }
            
            else {
                connection.query('select idx,title,content,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T")' +
                ' as moddate,DATE_FORMAT(regdate, "%Y/%m/%d %T") as regdate from board where idx=?',[idx],function(err,rows)
            {
              if(err) {
              
                console.log(err);
                connection.rollback(function () {
                  console.error('rollback error2');
                })
              }
              else {
                connection.commit(function (err) {
                  if(err) console.log(err);
                  console.log("row : " + rows);
                 //json으로 결과값을 보기위해서 이 코드를 이용한다. --> res.render코드 지워야함. 
                 // result.message = rows;
                  //result.status = res.statusCode;
                 // res.send(result);
                  res.render('read',{title:rows[0].title ,username:username,  rows : rows});
                });
              }
            });
            }
        });
    });
});
   
  //json으로 결과값을 보기위한 함수
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