

var express = require('express');
var mysql = require('mysql');
router = express.Router();
var connection = require('../mydb/db')();

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
router.use(session({
    secret : '1234DSFs@adf1234!@#$asd',
    resave : false,
    saveUninitialized : true, 
    store:new MySQLStore({
        host:'localhost',
        port:3306,
        user:'root',
        password:'111111',
        database:'board01'
      })
    
}));


router.get('/list', function(req, res, next){
    var username=req.body.username;
    req.session.username=username;
    var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board',function(err,rows){
        //json으로 결과값을 보기위해서 이 코드를 이용한다
           // var result = returnResult(err, res);
        if(err) {
            console.log(err);
            result.status = res.statusCode;
            res.send(result);
        }        // 만약 에러값이 존재한다면 로그에 표시합니다.
        else {
            console.log('rows :' +  rows);
            result.message = rows;
            res.render('list', { username: username, title:'Board List',rows: rows, result }); // view 디렉토리에 있는 list 파일로 이동합니다.
            //json으로 결과값을 보기위해서 이 코드를 이용한다. --> res.render코드 지워야함. 
            //result.status = res.statusCode;
            //res.send(result);
        }
      });
});

router.post('/list', function(req, res, next){
    //var body = req.body;
    var username = req.body.username;
    var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board',function(err,rows){
        var result = returnResult(err, res);
        if(err) {console.log(err);
            result.status = res.statusCode;
            res.send(result);
        }        // 만약 에러값이 존재한다면 로그에 표시합니다.
        else {
            //console.log('rows :' +  rows);
            //console.log('Hi Hello '+username);
            result.message = rows;
            res.render('list', { title:'Board List', username: username, rows: rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
        }
      });
});


//json으로 결과를 보기위한 함수처리 
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