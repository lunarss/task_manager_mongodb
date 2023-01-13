import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = (props) => {
  let { setCurrentUser } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    AuthService.login(email, password)
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        // navigate("/profile");
        navigate("/task");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Email</label>
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
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
          <button onClick={handleRegister} className="btn btn-light btn-block">
            <span>Register</span>
          </button>
        </div>
      </div>
      <footer className="pt-3 mt-4 text-muted border-top">
        Your password will be salted and hashed securely.
      </footer>
    </div>
  );
};

export default LoginComponent;
