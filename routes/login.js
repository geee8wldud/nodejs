

var express = require('express');
//var mysql = require('mysql');
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
router = express.Router();



var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var connection = require('../mydb/db')();

//세션 사용 준비 
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

router.get('/login', function(req, res, next){
    res.render('users/login');
});


router.use(passport.initialize());
router.use(passport.session());



///

passport.serializeUser(function(user, done){
    console.log('serializeUser', user);
    done(null, user.authId);
});
passport.deserializeUser(function(id, done){
    console.log('deserializeUser', id);
    var sql = 'SELECT * FROM users WHERE authId=?';
    connection.query(sql, [id], function(err, rows){
        if(err){
            console.log(err);
            done('There is no user.');
        }else {
            done(null, rows[0]);
        }
    });
});
//
passport.use(new LocalStrategy(
    function(username, password, done){
        var uname=username;
        var pwd=password;
        var sql ='SELECT * FROM users WHERE authId=?'; 
        connection.query(sql, ['local:'+uname], function(err, rows){
           //json으로 결과값을 보기위해서 이 코드를 이용한다
           // var result = returnResult(err, res);
            console.log(rows);
            if(err){
                return done('There is no users');
            }
            var user = rows[0];
            if(user){
                return hasher({ password:pwd, salt:user.salt}, function(err, pass, salt, hash){
                //사용자가 맞다면 
                if(hash==user.password){
                    ///
                    //session.req.username=username;
                    //console.log(session.req.username);
                    console.log('LocalStrategy', user);
                    //user객체
                    done(null, user);
                    //사용자가 아니라면
                }else {
                    done(null, false);
                }
            });
            }else {
                return done('There is no users');
            }
            
        });

    }
));

router.post('/login', 
    passport.authenticate('local', {
        successRedirect:'/users/welcome',
        failureRedirect:'/users/login',
        failureFlash:false })

        );


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