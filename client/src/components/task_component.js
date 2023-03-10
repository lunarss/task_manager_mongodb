import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskService from "../services/task.service";
import Nav from "../modules/Nav";
import Body from "../modules/Body";

const TaskComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [userName, setUserName] = useState("User");
  let [tasks, setTasks] = useState([]);
  let [today, setToday] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Use effect on Task Page.");
    let _id;

    if (currentUser) {
      _id = currentUser.user._id;
      setUserName(currentUser.user.username);
    } else {
      _id = "";
      setUserName("User");
    }

    fetchTaskDataByUserID(_id).catch((err) => {
      console.log(err);
    });
  }, [currentUser]);

  const handleLoginPage = () => {
    navigate("/login");
  };

  const fetchTaskDataByUserID = async (_id) => {
    let data;
    let taskList = [];

    data = await TaskService.getTasks(_id);

    for (let i = 0; i < data.data.length; i++) {
      taskList.push(data.data[i]);
    }
    setTasks(
      taskList
        .map((obj) => {
          let { _id, id, content, date, isComplete } = obj;
          let task = {
            _id: _id,
            id: id,
            content: content,
            date: date,
            isComplete: isComplete,
          };
          return task;
        })
        .sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
    );
  };

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
            today={today}
            setToday={setToday}
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
            today={today}
            setToday={setToday}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
