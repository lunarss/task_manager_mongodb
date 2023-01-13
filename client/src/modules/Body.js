import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";

const Body = (props) => {
  let { userName, tasks, setTasks } = props;
  let [sortName, setSortName] = useState("Sort by time ↑");
  let [sortVal, setSortVal] = useState("up");
  let [currentTime, setCurrentTime] = useState(0);

  const changeTaskStatus = (task, index) => {
    if (task["isComplete"] === "Not Complete") {
      TaskService.updateTask(
        task._id,
        task.id,
        task.content,
        task.date,
        "Complete"
      )
        .then((response) => {
          console.log(response.data);
          setTasks([
            ...tasks.slice(0, index),
            {
              _id: task._id,
              id: task.id,
              content: task.content,
              date: task.date,
              isComplete: "Complete",
            },
            ...tasks.slice(index + 1),
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const expireTasks = (task, index) => {
    if (task["isComplete"] === "Not Complete") {
      TaskService.updateTask(
        task._id,
        task.id,
        task.content,
        task.date,
        "Expired"
      )
        .then((response) => {
          console.log(response.data);
          setTasks([
            ...tasks.slice(0, index),
            {
              _id: task._id,
              id: task.id,
              content: task.content,
              date: task.date,
              isComplete: "Expired",
            },
            ...tasks.slice(index + 1),
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteTask = (task, index) => {
    TaskService.deleteTask(task._id)
      .then((response) => {
        console.log(response.data);
        setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = () => {
    let sort = document.querySelector("#sort");
    if (sort.value === "up") {
      setSortVal("down");
      setSortName("Sort by time ↓");
      setTasks(
        [...tasks].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
    } else if (sort.value === "down") {
      setSortVal("up");
      setSortName("Sort by time ↑");
      setTasks(
        [...tasks].sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
      );
    }
  };

  useEffect(() => {
    let today = new Date();

    let updateTasks = tasks.filter((task) => {
      let taskTime = new Date(task.date);
      return (
        taskTime.getTime() < today.getTime() &&
        taskTime.getDate() !== today.getDate() &&
        task.isComplete === "Not Complete"
      );
    });

    for (let i = 0; i < updateTasks.length; i++) {
      expireTasks(updateTasks[i]);
    }

    setTimeout(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);
  }, [currentTime]);

  return (
    <div>
      <button id="sort" onClick={handleSort} className="btn" value={sortVal}>
        {sortName}
      </button>
      <div className="body">
        {tasks.map((task, index) => {
          return (
            <div className="taskBlock">
              <p>
                {userName}'s Task{index + 1}
              </p>
              <p>{task.content}</p>
              <p>{task.date.split("T")[0]}</p>
              {/* <p>{task.date}</p> */}
              <button
                onClick={() => changeTaskStatus(task, index)}
                className={task.isComplete}
              >
                {task.isComplete}
              </button>
              <button onClick={() => deleteTask(task, index)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
