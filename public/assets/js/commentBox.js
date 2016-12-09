import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import $ from 'jquery';

// 评论内容
class Comment extends React.Component {
  rawMarkup () {
    let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }
  render () {
    return  <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <DeleteButton _id={this.props._id} />
      </div>;
  }
}

// 删除按钮组件
class DeleteButton extends React.Component {
  handleClick () {
  let _id = this.props._id;
  $.ajax({
      url: '/comments/'+ _id,
      type: 'DELETE',
      dataType: 'json'
    });
  }
  render () {
    return (
      <button className="deleteButton" onClick={this.handleClick.bind(this)}>删除</button>
      );
  }
}

// 评论列表
class CommentList extends React.Component {
  render () {
    let commentNodes = this.props.data.map(function (comment) {
      return <Comment author={comment.author} _id={comment._id}>
          {comment.text}
        </Comment>;
    });     
    return <div className="commentList">
        {commentNodes}
      </div>;
  }
}

// 提交表单
class CommentForm extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    let author = this.refs.author.value.trim();
    let text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';
    return;
  }
  render () {
    return <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="你的名字" ref="author" /> 
        <input type="text" placeholder="说些什么..." ref="text" />
        <input type="submit" value="发表" />
      </form>;
  }
}

// 评论框 父组件
class CommentBox extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);  // 因为此函数在setInterval中调用，所以要为其绑定作用域
  }
  loadCommentsFromServer () {
    let that = this;
    $.ajax({
      url: that.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      }
    });
  }
  handleCommentSubmit (comment) {
    // TODO: submit to the server and refresh the list
    let comments = this.state.data;
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({data: data});
      }
    });    
  }
  componentDidMount() {
    let run = this.loadCommentsFromServer;
    let that = this;
    run();
    setInterval(run, that.props.pollInterval);
  }
  render () {
    return <div className="commentBox">
        <h1>我的留言板</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div> ;
  }
}

module.exports = CommentBox;