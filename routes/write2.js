

var express = require('express');

router = express.Router();
var connection = require('../mydb/db')();


router.get('/write2',function (req,res,next) {
    res.render('write', {title:'글 쓰기 페이지'});
  });


  // POST 방식의 요청이 들어왔을 때 데이터를 DB에 저장하고 해당하는 DB의 IDX값을
// 가지고 온 후 Read 페이지로 이동
router.post('/write2',function (req,res,next) {
    //form 에서 정보를 받아오는것. 
    var body = req.body;
    //var writer = req.body.writer;
    var writer=req.body.username;
    var title = req.body.title;
    var content = req.body.content;
    var password = req.body.password;
  /*  if(title==undefined){
      var title = req.query.title;
      var writer=req.query.username;
      var content = req.query.content;
      var password = req.query.password;

    }*/
    console.log('HiHello '+title);

    connection.beginTransaction(function(err) {
      if(err) console.log(err);
      connection.query('insert into board(title,writer,content,password) values(?,?,?,?)'
          ,[title,writer,content,password]
          ,function (err) {
            //json으로 결과값을 보기위해서 이 코드를 이용한다
           // var result = returnResult(err, res);
            if(err) {
              console.log(err);
              connection.rollback(function () {
                console.error('rollback error1');
              })
            }
            connection.query('SELECT LAST_INSERT_ID() as idx',function (err,rows) {
              if(err) {
                console.log(err);
                connection.rollback(function () {
                  console.error('rollback error1');
                })
              }
              else
              {
                connection.commit(function (err) {
                  if(err) console.log(err);
                  console.log("row : " + rows);
                  var idx = rows[0].idx;
                  //json으로 결과값을 보기위해서 이 코드를 이용한다. --> res.render코드 지워야함. 
                 // result.message = rows;
                 // result.status = res.statusCode;
                  //res.send(result);
                  res.redirect('/board/read/'+idx);

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

  
  module.exports=router;