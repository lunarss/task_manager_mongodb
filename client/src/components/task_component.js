import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskService from "../services/task.service";
import Nav from "../modules/Nav";
import Body from "../modules/Body";

const TaskComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [userName, setUserName] = useState("User");
  let [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log("Use effect on Task Page.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      setUserName(currentUser.user.username);
    } else {
      _id = "";
      setUserName("User");
    }

    TaskService.getTasks(_id)
      .then((data) => {
        let taskList = [];
        for (let i = 0; i < data.data.length; i++) {
          taskList.push(data.data[i]);
        }
        setTasks(
          taskList.map((obj) => {
            let { _id, id, content, date, isComplete } = obj;
            let task = {
              _id: _id,
              id: id,
              content: content,
              date: date.split("T")[0],
              isComplete: isComplete,
            };
            return task;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  setTimeout({}, 500);

  return (
    <div className="taskbox" style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first.</p>
          <button onClick={handleLoginPage} className="btn btn-primary btn-lg">
            Login Page
          </button>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30%" }}>
          <Nav
            userName={userName}
            setUserName={setUserName}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
        <div style={{ width: "70%" }}>
          <Body
            userName={userName}
            setUserName={setUserName}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
