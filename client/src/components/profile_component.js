import React from "react";

const ProfileComponent = (props) => {
  let { currentUser } = props;
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>You must login first.</div>}
      {currentUser && (
        <div>
          <h2>Profile Page</h2>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>ID: {currentUser.user._id}</strong>
          </p>
          <p>
            <strong>Email: {currentUser.user.email}</strong>
          </p>
          <p>
            <strong>Token: {currentUser.token}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
