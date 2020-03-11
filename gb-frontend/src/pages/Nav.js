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
                <a href="">Signup</a>
              </li>
              <li>
                <a href="">Login</a>
              </li>
              <li>
                <a href="">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
