var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./CommentBox');

ReactDOM.render(
    <CommentBox url="/comments" pollInterval={2000} />,
    document.getElementById('commentbox')
 );