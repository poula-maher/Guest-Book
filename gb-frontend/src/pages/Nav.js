import React, { Component } from "react";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div className="Navbar">
          <h3>Guest Book</h3>
          <div className="Nav-btns">
            <ul>
              <li>
                <a href="/signup">Signup</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <button onClick={this.props.handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
