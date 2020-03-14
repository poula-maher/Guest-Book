import React, { Component } from "react";
import "./Home.css";
import Message from "../components/Message";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      creator: "aaa",
      userId: "1"
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/", {
      // headers: {
      //   Authorization: "Bearer " + this.props.token
      // }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts.");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          messages: resData
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = e => {
    console.log(e);
    const newMessage = this.state.message;
    console.log(newMessage);
    this.setState({
      messages: [...this.state.messages],
      message: ""
    });
    fetch("http://localhost:8080/create-message", {
      method: "POST",
      body: JSON.stringify({
        message: newMessage,
        userId: "5e6a6287ea7b8d4594ba3241"
        // userId: this.props.userId
      })
      // headers: {
      //   //   Authorization: "Bearer " + this.props.token,
      //   "Content-Type": "application/json"
      // }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts.");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        // this.setState({
        //   messages: resData
        // });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="Home">
        {this.props.isAuth && (
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="message"></label>
              <input
                className="Home-newMsgInput"
                id="message"
                type="text"
                onChange={this.handleChange}
                value={this.state.message}
                placeholder="ADD NEW MESSAGE"
              />
              <button className="Home-newbtn" type="submit">
                Add New Message
              </button>
            </form>
          </div>
        )}
        <div className="messages">
          {this.state.messages.map(m => {
            return (
              <Message
                key={m._id}
                message={m.text}
                creator={this.state.creator}
                userId={this.state.userId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
