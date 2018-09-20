
var express = require('express');
var mysql = require('mysql');
router = express.Router();
var connection = require('../mydb/db')();

  router.get('/read/:idx',function (req,res,next) {
    var idx = req.params.idx;
    console.log("idx : "+idx);
  
        connection.beginTransaction(function(err){
          //json으로 결과값을 보기위해서 이 코드를 이용한다
           // var result = returnResult(err, res);
          if(err) console.log(err);
          connection.query('update board set hit=hit+1 where idx=?', [idx], function (err) {
            if(err) {
              console.log(err);
              connection.rollback(function () {
                console.error('rollback error1');
              })
              ///Json 형식으로 출력하기위한 코드
            //result.status = res.statusCode;
            //res.send(result);
            }
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
                  var username=rows[0].writer;
                 //json으로 결과값을 보기위해서 이 코드를 이용한다. --> res.render코드 지워야함. 
                 // result.message = rows;
                 // result.status = res.statusCode;
                  //res.send(result);
                  res.render('read',{title:rows[0].title ,username : username, rows : rows});
                });
              }
            });
        });
    });
  });


  router.post('/read/:idx',function (req,res,next) {
    var idx = req.params.idx;
    var username=req.body.username;
    console.log("idx : "+idx);
  
        connection.beginTransaction(function(err){
          if(err) console.log(err);
          connection.query('update board set hit=hit+1 where idx=?', [idx], function (err) {
            if(err) {
              console.log(err);
              connection.rollback(function () {
                console.error('rollback error1');
              })
            }
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

                  //////////////
                  else{
                    console.log("row : " + rows);
                    if(username==rows[0].writer){
                      res.render('read',{title:rows[0].title ,username : username, rows : rows});
                    }else{
                      res.render('read2',{title:rows[0].title ,username : username, rows : rows});
                    }
                    
                  }
                  
                });
              }
            });
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