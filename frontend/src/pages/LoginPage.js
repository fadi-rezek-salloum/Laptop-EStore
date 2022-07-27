import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

import { faUser, faLock, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <section className="mt-5">
      <h1 className="text-center">Login</h1>
      <form className="w-50 mt-5 mx-auto" onSubmit={loginUser}>
        <label htmlFor="username" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username..."
          className="form-control"
          required
        />
        <br />

        <label htmlFor="password" className="form-label">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password..."
          className="form-control"
          required
        />
        <br />

        <button type="submit" className="btn btn-primary w-100">
          <FontAwesomeIcon icon={faSignIn} className="mx-2" />
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
