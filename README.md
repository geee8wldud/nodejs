

# Nodejs-board-project(JavaScript) 2018-09-11
- vscode, nodejs, express, mysql, ejs


|   1  |

         
* 기능 			:   `게시판 리스트보여주기`           
* endpoint      :     `/board/list `  
* Description   :       `데이터베이스에서 board에 저장되어있던 정보들을 모두 조회한 뒤 리스트에 보여준다. `
* 결과  :     `게시판 리스트 화면` 
* json 결과 예시
```
{
    "message": [
        {
            "idx": 1,
            "title": "첫번째 글",
            "writer": "abcd01",
            "hit": 11,
            "moddate": "2018/09/07 16:03:50"
        },
        {
            "idx": 2,
            "title": "두번째 글",
            "writer": "abcd02",
            "hit": 11,
            "moddate": "2018/09/07 16:03:50"
        },
        {
            "idx": 3,
            "title": "세번째 글",
            "writer": "abcd03",
            "hit": 13,
            "moddate": "2018/09/07 16:03:50"
        }
    ],
    "status": 200
}
```




| 2  |  

 *  기능 `특정 게시글 읽기`  
 *  endpoint         :  `/board/read/:idx`            
 *  Method          :  `Get` 
 *  Description         :  `인자로 받아온 idx를 이용해 idx번째 게시글의 조회수를 업데이트한다. (안티패턴) -> put 메서드를 사용해야 한다. ` 
 * 결과        :  `idx번째 게시글에 조회수 업데이트된 읽기 화면` 
 * json 결과 예시
```
{
    "message": [
        {
            "idx": 2,
            "title": "두번째 글",
            "content": "두번째 글 내용",
            "writer": "abcd02",
            "hit": 12,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        }
    ],
    "status": 200
}

```

| 3  |       

* 기능  : `특정 게시글 수정`            
* endpoint        :  `/board/modify/:idx `    
* Method          :  ` Post ` 
* Description    :  `param값으로 idx를 받아와서 board테이블에서 id값이 idx인 것을 조회한다.`
* 결과      :  `idx번째 게시글의 수정 화면` 
* body         
```
{"username":"user1"}
```
* json 결과 예시
```
{
    "message": [
        {
            "idx": 3,
            "title": "세번째 글",
            "content": "세번째 글 내용",
            "writer": "abcd03",
            "hit": 13,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        }
    ],
    "status": 200
}
  
```

|  4   |  

* 기능 : `게시글 쓰기`           
* endpoint         :  `/board/write2 `            
* Method          :  ` Post ` 
* Description      :  `param값으로 idx를 받아와서 board테이블에서 id값이 idx인 것을 조회한다.` 
* 결과       : `idx번째 게시글의 수정 화면` 
* body       
```
{
            "title":"aa",
            "username":"user1",
            "password": "aa",
            "content" : "aa"
        }
```

* json 결과 예시
```
{
    "message": [
        {
            "idx": 3,
            "title": "세번째 글",
            "content": "세번째 글 내용",
            "writer": "abcd03",
            "hit": 13,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        }
    ],
    "status": 200
}
  
```


|   5 |              

* 기능     :  `게시글 수정 `           
*  endpoint        : `/board/modify2  `            
* Method        :  ` Post ` 
* Description        : `idx값과 수정된 값들을 post형태로 받아온 뒤 idx번째 게시글을 받아온 정보에 맞게 수정한다.  (안티패턴) ->  put메서드를 사용해야 한다. ` 
* 결과        :  `수정 후 수정된 화면` 
* body        
```
{
         "idx":"3",
         "title":"aa",
         "content":"aa",
         "username":"abc03"
         
}
```
* json 결과 예시
```
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 3,
    "warningCount": 0,
    "message": [
        {
            "idx": 3,
            "title": "aa",
            "content": "aa",
            "writer": "abcd03",
            "hit": 13,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        }
    ],
    "protocol41": true,
    "changedRows": 1,
    "status": 200
}
 
  
```


| 6    |   

* 기능              : `게시글 삭제 `            
* endpoint         : `/board/delete1  `            
* Method           : ` Post ` 
* Description     :  `idx값을 post형태로 받아온뒤 idx번째 게시글을 삭제한 후 리스트화면을 redirect한다. (안티패턴)  ->  delete메서드를 사용해야한다. ` 
* 결과        :  `삭제 후 게시판 리스트 화면`
* body        
```
{
         "idx":"3",
         "username":"abc03"
}
```
* json 결과 예시    -삭제 후 board테이블에 남아있는 행들을 보여준다.
```
 {
    "message": [
        {
            "idx": 1,
            "title": "첫번째 글",
            "content": "첫번째 글 내용",
            "writer": "abcd01",
            "hit": 11,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        },
        {
            "idx": 2,
            "title": "두번째 글",
            "content": "두번째 글 내용",
            "writer": "abcd02",
            "hit": 13,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        },
        {
            "idx": 3,
            "title": "세번째 글 ",
            "content": "세번째 글 내용",
            "writer": "abcd03",
            "hit": 16,
            "moddate": "2018/09/07 16:03:50",
            "regdate": "2018/09/07 16:03:50"
        }
    ],
    "status": 200
}
  
```

| 7      |  

* 기능 : `회원가입  `            
*  endpoint       : `/users/register    `            
* Method          :  ` Post `
* Description    :  `받아온 정보를 가지고 users테이블에 새로운 행을 생성한다. 아이디가 이미 존재하면 register2를 redirect한다. ` 
* 결과       :  `가입한 회원 생성 후, welcome화면`
* body         
```
 {
            "username" : "user8",
            "password" : "111111",
            "userEmail" : "user8"
 }
```
* json 결과 예시
```
{
    "message": "Success",
    "status": 500
}
  
```


> Written with [StackEdit](https://stackedit.io/).