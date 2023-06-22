import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    navigate("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1 navi">
        <span className="brand-logo">Shorten link</span>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down"
        >
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/links">Links</Link>
          </li>
          <li>
            <a
              href="/"
              onClick={logoutHandler}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
