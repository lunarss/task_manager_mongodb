import React, { useState } from "react";
import TaskService from "../services/task.service";
import { v4 as uuidv4 } from "uuid";

const Nav = (props) => {
  let { userName, tasks, setTasks } = props;
  let [message, setMessage] = useState("");
  let [uuid, setUUID] = useState(uuidv4());

  const createNewTask = (e) => {
    let taskContent = document.querySelector("#taskContent").value;
    let taskDate = document.querySelector("#taskDate").value;
    let isComplete = document.querySelector("#complete").checked;
    let complete = "";
    let today = new Date();

    if (!taskContent || !taskDate) {
      setMessage("Please complete the task.");
      return setTimeout(() => {
        setMessage("");
      }, 5000);
    }

    if (isComplete) {
      complete = "Complete";
    } else {
      if (new Date(taskDate) < today) {
        complete = "Expired";
      } else {
        complete = "Not Complete";
      }
    }

    if (taskContent !== "" && taskDate !== "") {
      TaskService.postTask(uuid, taskContent, taskDate, complete)
        .then((response) => {
          console.log(response.data);
          return TaskService.getTaskByUUID(uuid);
        })
        .then((data) => {
          setTasks(
            [
              ...tasks,
              {
                _id: data.data._id,
                id: data.data.id,
                content: data.data.content,
                date: data.data.date.split("T")[0],
                isComplete: data.data.isComplete,
              },
            ].sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
          );
          setUUID(uuidv4());
        })
        .catch((err) => {
          console.log(err);
        });
      document.querySelector("#taskContent").value = "";
      document.querySelector("#taskDate").value = "";
      setMessage("");
    }
  };

  return (
    <div className="setbox bg-light rounded-3">
      <div className="sheet container-fluid py-5">
        <nav>
          <div className="row align-items-md-stretch">
            <span className="fs-5">{userName}'s Task Schedule</span>
            <span className="fs-6">Task Content:</span>
            <textarea
              style={{ width: "100%" }}
              className="taskContent"
              id="taskContent"
            />
            <br />
            <span className="fs-6">Task Date:</span>
            <input className="taskDate" type="date" id="taskDate" />
            <br />

            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <span className="fs-6">Completed?</span>
                  </li>
                  <li>
                    <input className="complete" type="checkbox" id="complete" />
                  </li>
                </ul>
              </div>
            </nav>

            <br />
            <button
              className="btn btn-primary btn-block"
              onClick={createNewTask}
            >
              Create Task
            </button>
          </div>
          <br />
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
