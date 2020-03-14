import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
      token: null
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
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
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
        this.props.history.replace("/");
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
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
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
        <Nav handleLogout={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home userId={this.state.userId} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login handleLogin={this.handleLogin} />}
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

export default App;
