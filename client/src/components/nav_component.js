import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    console.log("Logout Successfully.");
    setCurrentUser(null);
    navigate("/");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button onClick={handleBackToHome} className="btn">
                    <i className="fa fa-home"></i>
                  </button>
                  {/* <Link className="nav-link active" to="/">Home</Link> */}
                </li>
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/task">
                      Task
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      type="button"
                      style={{ marginLeft: "85vw", color: "white" }}
                      onClick={handleLogout}
                      className="btn btn-danger nav-link"
                      to=""
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
