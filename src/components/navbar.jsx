import React from "react";
import { Link } from "react-router-dom";
import Signout from "./Signout";
import CartWidget from "./CardWidget"; // Asegúrate de que el nombre del archivo es correcto
import logo from "../media/logo.png";
import UserProfile from "./userProfile";

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="TU FRUTI YA!"
            style={{ maxWidth: "120px", height: "5rem" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {user && (user.role === 1 || user.role === 2) && (
              <li className="nav-item">
                <Link className="nav-link" to="/form">
                  Form
                </Link>
              </li>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {user && (
              <>
                <li>
                  <Link className="nav-link" to="/userprofile">
                    UserProfile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <CartWidget />
                  </Link>
                </li>
                <li>
                  <Signout setUser={setUser} />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
