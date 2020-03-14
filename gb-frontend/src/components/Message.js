import React, { Component } from "react";
import "./Message.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
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
          {this.state.isEditMode && this.props.isAuth && (
            <form className="form" onSubmit={this.handleSubmit}>
              <label htmlFor="message"></label>
              <input
                className="Message-editMsgInput"
                id="message"
                type="text"
                onChange={this.handleChange}
                value={this.state.message}
                placeholder="Edit MESSAGE"
              />
              <button className="small-btn" type="submit">
                Edit Message
              </button>
            </form>
          )}
          <h4>Replys:</h4>
          {this.state.replys.map(r => (
            <p className="Message-reply">{r.text}</p>
          ))}
          {this.state.isReplyMode && this.props.isAuth && (
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-div">
                <label htmlFor="reply"></label>
                <input
                  className="Message-editMsgInput"
                  id="reply"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.message}
                  placeholder="Edit MESSAGE"
                />
                <button className="small-btn" type="submit">
                  Reply
                </button>
              </div>
            </form>
          )}
        </main>
        <div className="Message-actions">
          {/* <button  link={props.id}>
                        View
                    </button> */}
          <button
            className="Message-btn"
            onClick={() => {
              this.setState({
                isEditMode: this.state.isEditMode ? false : true
              });
            }}
          >
            Edit
          </button>
          <button
            className="Message-btn"
            onClick={() => {
              this.setState({
                isReplyMode: this.state.isReplyMode ? false : true
              });
            }}
          >
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
