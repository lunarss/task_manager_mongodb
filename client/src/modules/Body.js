import React, { useState, useEffect } from "react";
import TaskService from "../services/task.service";

const Body = (props) => {
  let { userName, tasks, setTasks } = props;
  let [sortName, setSortName] = useState("Sort by time ↑");
  let [sortVal, setSortVal] = useState("up");
  let [currentTime, setCurrentTime] = useState(0);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sleep1s(callback, ...args) {
    await timeout(1000);
    return callback(...args);
  }

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

  const expireTasks = async (task, index) => {
    let response = await TaskService.updateTask(
      task._id,
      task.id,
      task.content,
      task.date,
      "Expired"
    );
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
    console.log("Use effect on Body Module.");
    let today = new Date();

    for (let i = 0; i < tasks.length; i++) {
      let taskTime = new Date(tasks[i].date);
      if (
        !(
          taskTime.getTime() < today.getTime() &&
          taskTime.getDate() !== today.getDate() &&
          tasks[i].isComplete === "Not Complete"
        )
      ) {
        continue;
      }
      expireTasks(tasks[i], i).catch((err) => {
        console.log(err);
      });
    }

    sleep1s(() => {
      setCurrentTime(currentTime + 1);
    });
  }, [currentTime]);

  return (
    <div>
      <button id="sort" onClick={handleSort} className="btn" value={sortVal}>
        {sortName}
      </button>
      <div className="body">
        {tasks.map((task, index) => {
          let name_id;
          if (sortVal === "down") {
            name_id = tasks.length - index - 1;
          } else {
            name_id = index;
          }
          return (
            <div className="taskBlock">
              <p>
                {userName}'s Task{name_id + 1}
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
