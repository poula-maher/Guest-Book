import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  handleClick = () => {
    this.props.handleLogout();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="Nav">
        <div className="Navbar">
          <a href="/" className="title">
            Guest Book
          </a>
          <div className="Nav-btns">
            <ul>
              {!this.props.isAuth && (
                <>
                  <li>
                    <a href="/signup">Signup</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                </>
              )}
              {this.props.isAuth && (
                <li>
                  <a className="Nav-logout" onClick={this.handleClick}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
