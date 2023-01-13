import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password)
      .then(() => {
        console.log(username + " Registration Successful.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">
        Your password will be salted and hashed securely.
      </footer>
    </div>
  );
};

export default RegisterComponent;
