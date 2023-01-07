import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = (props) => {
  let { currentUser } = props;
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate("/task");
    }
  };

  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Manage Your Task</h1>
            <p className="col-md-8 fs-4">Welcome...</p>
            <button
              onClick={handleLogin}
              className="btn btn-primary btn-lg"
              type="button"
            >
              Go to Task Manager
            </button>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          {/* &copy; 2023 HY */}
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
