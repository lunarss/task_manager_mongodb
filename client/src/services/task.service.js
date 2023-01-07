import axios from "axios";

const API_URL = "http://" + process.env.REACT_APP_LOCALHOST + ":8080/api/tasks";

class TaskService {
  // create a new task
  postTask(id, content, date, isComplete) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/",
      { id, content, date, isComplete },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // get all tasks by user id
  getTasks(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/user/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // get a task by task id
  getTask(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // get a task by task uuid
  getTaskByUUID(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/uuid/" + id, {
      headers: {
        Authorization: token,
      },
    });
  }

  // update a task by task id
  updateTask(_id, id, content, date, isComplete) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/" + _id,
      { id, content, date, isComplete },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // delete a task by task id
  deleteTask(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new TaskService();
