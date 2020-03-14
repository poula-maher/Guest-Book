import React, { Component } from "react";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    const email = this.state.email;
    const name = this.state.name;
    const password = this.state.password;
    this.props.handleSignup(email, name, password);
    this.setState({
      email: "",
      name: "",
      password: ""
    });
  }
  render() {
    return (
      <div className="Signup">
        <div className="form">
          <h1>SIGNUP</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email "
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
