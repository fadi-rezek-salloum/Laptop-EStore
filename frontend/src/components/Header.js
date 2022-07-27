import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { faHome, faKeyboard, faLaptop, faPlusCircle, faScrewdriverWrench, faSignOut, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../images/logo.png';
import UserLogo from '../images/user.png'

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  const getUserRole = () => {
    if (user) {
      return user.role
    } else {
      return 'normal'
    }
  };

  const getUserName = () => {
    if (user) return user.username;
    else return null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Logo" className="website__logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Home
              </Link>
            </li>

            <li
              className={
                user
                  ? getUserRole() === "admin"
                    ? "nav-item"
                    : "d-none"
                  : "d-none"
              }
            >
              <Link className="nav-link" to="/register-admin">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Add Employee 
              </Link>
            </li>

            <li
              className={
                getUserRole() === "normal"
                    ? "nav-item"
                    : "d-none"
              }
            >
              <Link
                className='nav-link'
                to="/product/request/repair"
              >
                <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
                Request Repair
              </Link>
            </li>

            <li className={
                user
                  ? getUserRole() === "admin"
                    ? "nav-item dropdown"
                    : "d-none"
                  : "d-none"
              }
            >
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                Users Requests
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link
                    className="dropdown-item"
                    to={"/product/approve/repair/"}
                  >
                    <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
                    Repair Requests
                  </Link>
                </li>
              </ul>
            </li>

          </ul>

          <ul className="navbar-nav">
            <li className={ user ? 'd-none' : 'nav-item me-3'}>
              <Link to='/login' className="nav-link btn btn-success">
                Login
              </Link>
            </li>
            <li className={ user ? 'd-none' : 'nav-item'}>
              <Link to='/register' className="nav-link btn btn-primary">
                Register
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={!user ? "d-none" : "nav-link dropdown-toggle"}
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={UserLogo} alt="User" className="user__logo" />
                {getUserName()}
              </Link>
              <ul
                className={user ? "dropdown-menu dropdown-menu-end" : "d-none"}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <div className="dropdown-item" onClick={logoutUser}>
                    <FontAwesomeIcon icon={faSignOut} className="me-2" />
                    Logout
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
