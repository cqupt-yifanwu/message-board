/*
 * GET comments listing.
 * 完整的定义增删改查
 */

/*var comments = require('../model/comments').comments; // 模拟后台的数据*/
var Comment = require('../model/CommentDB');  // 引入的model，可用来操作数据库和生成Entity
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://127.0.0.1:27017/comment'); // 链接数据库
db.connection.on('connected', function () {
  console.log('Mongoose connection success');
});
db.connection.on('error', function (err) {
  console.log('connection error');
});
var i = 0;
  
exports.list = function(req, res){  
  var msg;
  Comment.find(function (err, comment) {
    msg = comment;
      console.log(msg);
      res.json(msg);  
  });
};  
  
exports.get = function(req, res){  
   if(comments.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No comment found');
  }  
  var q = comments[req.params.id];
  res.json(q); 
};  
  
  
exports.delete = function(req, res){  
  Comment.remove({_id: req.params.id},function (err) {
    if (err) {
      console.log(err);
    };
    Comment.find(function (err, comment) {
      res.json(comment);  
    });
  });
};  
  
// 更新某一条数据
/*exports.update = function(req, res){  
  res.setHeader('Content-Type', 'application/json;charset=utf-8'); 
  for(var i=0;i<comments.length;i++){
    if(comments[i].author==req.body.author){
      comments[i] = req.body;  
      res.send({status:"success", message:"update comment success"});  
      console.log(comments);        
    }
  } 
};  */
  
exports.add = function(req, res){  
  if(!req.body.hasOwnProperty('author') || 
     !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  } 
  // 实例化新添加的内容
  var newComment = {
    author : req.body.author,
    text : req.body.text
  }; 
  var commentEntity = new Comment(newComment);
  commentEntity.save();
  res.json(true);   
};