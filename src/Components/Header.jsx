import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="App-container">
        <nav>
          <img
            src="https://mvendgroup.com/images/logo-sm.svg"
            alt="logo"
            onClick={(e) => navigate("/")}
            className="logo"
          />
          <ul className="nav-flex">
            <Link to="/" className="li">
              Home
            </Link>
            <Link to="/signup" className="li">
              Login
            </Link>
            <Link to="/signup" className="li">
              Sign Up
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
