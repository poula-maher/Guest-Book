import React, { Component } from "react";
import "./Message.css";

class Post extends Component {
  render() {
    return (
      <div className="Message">
        <header>
          <p className="Message-creator">posted by:{this.props.creator}</p>
          <h2 className="Message-content">{this.props.message}</h2>
        </header>
        <div className="Message-actions">
          {/* <button  link={props.id}>
                        View
                    </button> */}
          <button onClick={this.props.onStartEdit}>Edit</button>
          <button onClick={this.props.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Post;
