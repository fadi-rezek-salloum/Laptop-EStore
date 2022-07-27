import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

import {
  faPlus,
  faInfoCircle,
  faUser,
  faLock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory } from "react-router-dom";

import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

const RegisterPage = () => {
  let { user } = useContext(AuthContext);

  let history = useHistory()

  if ( user ) {
    history.push('/')
  }

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pwd, matchPwd]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid entry");
      return;
    }

    let response = await axios.post(
      'http://localhost:8000/api/accounts/register/',
      {
        username: username,
        email: email,
        password: pwd,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      setSuccess(true);
      setUserName("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
      setErrMsg("");
    } else {
      setSuccess(false);
      setErrMsg(response);
    }
  };

  return (
    <section className="mt-5">
      <h1 className="text-center">Add A New User</h1>
      <form className="w-50 mt-5 mx-auto" onSubmit={handelSubmit}>
        <div
          ref={errRef}
          className={errMsg ? "alert alert-danger" : "d-none"}
          aria-live="assertive"
        >
          {errMsg}
        </div>
        <div
          className={success ? "alert alert-success" : "d-none"}
          aria-live="assertive"
        >
          A new user has been created!
        </div>

        <label htmlFor="username" className="form-label">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username..."
          className={
            validUserName
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          ref={userRef}
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          required
          aria-invalid={validUserName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserNameFocus(true)}
          onBlur={() => setUserNameFocus(false)}
        />
        <div
          id="uidnote"
          className={
            userNameFocus && username && !validUserName ? "form-text" : "d-none"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />4 to 24
          characters. Must begin with a letter. Letters, numbers, underscores,
          hyphens allowed.
        </div>
        <br />

        <label htmlFor="email" className="form-label">
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email..."
          className={
            validEmail
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
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
          className={
            validPwd
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          aria-describedby="pwdnote"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <div
          id="pwdnote"
          className={pwdFocus && pwd && !validPwd ? "form-text" : "d-none"}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          8 to 24 characters. Must include uppercase and lowercase letters, a
          number and a special character. <br />
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </div>
        <br />

        <label htmlFor="confirm_pwd" className="form-label">
          <FontAwesomeIcon icon={faLock} className="me-2" />
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm_pwd"
          id="confirm_pwd"
          aria-describedby="confirmnote"
          placeholder="Confirm Password..."
          className={
            validMatch
              ? "form-control form__input-valid"
              : "form-control form__input-invalid"
          }
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <div
          id="confirmnote"
          className={matchFocus && !validMatch ? "form-text" : "d-none"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </div>
        <br />

        <button
          disabled={
            !validUserName ||
            !validEmail ||
            !validPwd ||
            !validMatch
              ? true
              : false
          }
          className="btn btn-primary mb-5 w-100"
          type="submit"
        >
          <FontAwesomeIcon icon={faPlus} className="mx-2" />
          Add User
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
