import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
    const password = this.state.password;
    this.props.handleLogin(email, password);
    this.setState({
      email: "",
      password: ""
    });
  }
  render() {
    return (
      <div className="Login">
        <div className="form">
          <h1>Login</h1>
          <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email "
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
