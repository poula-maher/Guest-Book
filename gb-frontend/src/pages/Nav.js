import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <h3>Guest Book</h3>
      <div className="Nav-btns">
        <a href="">Signup</a>
        <a>Login</a>
        <a>Logout</a>
      </div>
    </div>
  );
}

export default Nav;
