import React, { Component } from "react";
import "./Message.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplyMode: false,
      replys: [{ text: "asdasd", userId: "id" }]
    };
  }
  render() {
    return (
      <div className="Message">
        <header>
          <p className="Message-creator">posted by: {this.props.creator}</p>
        </header>
        <main className="Message-main">
          <h2 className="Message-content">{this.props.message}</h2>
          <h4>Replys:</h4>
          {this.state.replys.map(r => (
            <p className="Message-reply">{r.text}</p>
          ))}
        </main>
        <div className="Message-actions">
          {/* <button  link={props.id}>
                        View
                    </button> */}
          <button className="Message-btn" onClick={this.props.onStartEdit}>
            Edit
          </button>
          <button className="Message-btn" onClick={this.props.onReply}>
            Reply
          </button>
          <button className="Message-btn" onClick={this.props.onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
