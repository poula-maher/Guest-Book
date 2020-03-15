import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userId: null,
      token: null,
      username: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.handleLogout();
      return;
    }
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      username: username
    });
    this.setAutoLogout(remainingMilliseconds);
  }

  handleSignup = (email, name, password) => {
    fetch("http://localhost:8080/signup", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json"
      // },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ isAuth: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false
        });
      });
  };

  handleLogin = (email, password) => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json"
      // },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.username);
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          username: resData.username
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("username", resData.username);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false
        });
      });
  };

  handleLogout = () => {
    this.setState({ isAuth: false, token: null, username: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.handleLogout();
    }, milliseconds);
  };

  render() {
    return (
      <div className="App">
        <Nav isAuth={this.state.isAuth} handleLogout={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                isAuth={this.state.isAuth}
                username={this.state.username}
                userId={this.state.userId}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login {...props} handleLogin={this.handleLogin} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup handleSignup={this.handleSignup} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
