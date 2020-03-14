import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
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
    e.preventDefault();
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
      }),
      headers: {
        //   Authorization: "Bearer " + this.props.token,
        "Content-Type": "application/json"
      }
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
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="message"></label>
            <input
              id="message "
              type="text"
              onChange={this.handleChange}
              value={this.state.message}
            />
            <input type="submit" />
          </form>
        </div>
        <h1>Messages</h1>
        {this.state.messages.map(m => {
          return <li>{m.text}</li>;
        })}
      </div>
    );
  }
}

export default Home;
