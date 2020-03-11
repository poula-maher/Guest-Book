import React, { Component } from "react";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {/* <Home /> */}
        {/* <Signup /> */}
        <Login />
      </div>
    );
  }
}

export default App;
