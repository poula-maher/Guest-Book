import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ text: "sadsd" }, { text: "sadsadasd" }],
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ message: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newMessage = this.state.message;
    this.setState({
      messages: [...this.state.messages, { text: newMessage }],
      message: ""
    });
  }
  render() {
    return (
      <div className="Home">
        <div className="form">
          <form action="" onSubmit={this.handleSubmit}>
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
        <h1>asd</h1>
        {this.state.messages.map(m => {
          return <li>{m.text}</li>;
        })}
      </div>
    );
  }
}

export default Home;
