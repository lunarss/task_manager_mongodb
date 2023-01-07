import React from "react";
import TaskService from "../services/task.service";

const Body = (props) => {
  let { userName, tasks, setTasks } = props;

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

  return (
    <div className="body">
      {tasks.map((task, index) => {
        return (
          <div className="taskBlock">
            <p>
              {userName}'s Task{index + 1}
            </p>
            <p>{task.content}</p>
            <p>{task.date}</p>
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
  );
};

export default Body;
