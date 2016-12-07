var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	id: Number,
	author: String,
	text: String
});

// 将Schema发布为model
var Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;

/*
*	-- Schema: 一种以文件形式存储的数据库模型骨架，不具备数据库操作能力
*	-- Model : 由Schema发布生成的模型，具有抽象属性和行为的数据库操作
*	-- Entity: 有Model创建的实体，它的操作也会影响数据库
*/