import axios from "axios";
import { toast } from "react-toastify";

import { toDoRequest, todoSuccess, getUser } from "./actions";

export const registerUser = (formValues, profile) => {
  var formData = new FormData();
  formData.append("name", formValues.name);
  formData.append("email", formValues.email);
  formData.append("password", formValues.password);
  formData.append("cpassword", formValues.cpassword);
  formData.append("profile", profile);
  return async (dispatch) => {
    await axios
      .post("/signup", formData)
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("name", res.data.name);
        const todo_list = res.data.todo_list;
        dispatch(todoSuccess(todo_list));
        toast("user added successfully!", { type: "success" });
        window.location = "/todo";
        return { isRegistered: true };
      })
      .catch((error) => {
        toast(error, { type: "error" });
        return { isRegistered: false };
      });
  };
};

export const getUserProfile = (id) => {
  return async (dispatch) => {
    dispatch(toDoRequest());
    await axios
      .get(`/profile/${id}`)
      .then((response) => {
        const user = response.data;
        dispatch(getUser(user));
      })
      .catch((error) => {
        toast("Issue in displaying profile", error, { type: "error" });
      });
  };
};

export const userLogin = (user) => {
  return async (dispatch) => {
    await axios
      .post("/login", user)
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("name", res.data.name);
        const todo_list = res.data.todo_list;
        dispatch(todoSuccess(todo_list));
        toast("login successfully!", { type: "success" });
        window.location = "/todo";
      })
      .catch((error) => {
        toast("Check email id and password!", error, { type: "error" });
      });
  };
};

export const addUSerTodo = (id, todo) => {
  const options = {
    url: "/addtodo",
    method: "post",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    data: {
      id,
      todo,
    },
  };
  return (dispatch) => {
    axios(options)
      .then((response) => {
        toast("todo added successfully!", { type: "success" });
        dispatch(fetchToDoList(id));
      })
      .catch((error) => {
        toast("error in adding todo!", error, { type: "error" });
      });
  };
};

export const toDoEdit = (id, todo) => {
  const options = {
    url: "/edittodo",
    method: "put",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    data: {
      id,
      todo,
    },
  };
  return async (dispatch) => {
    await axios(options)
      .then((response) => {
        toast("edited successfully!", response.data, { type: "success" });
      })
      .catch((error) => {
        toast("error in editing a todo!", error, { type: "error" });
      });
  };
};
export const deleteToDo = (id) => {
  const options = {
    url: `/deletetodo/${id}`,
    method: "delete",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  };
  return async () => {
    axios(options)
      .then((response) => {
        toast("deleted successfully!", { type: "success" });
      })
      .catch((e) => {
        toast("error in deleting todo!", { type: "error" });
      });
  };
};

export const statusOfToDo = (id, userId, status) => {
  const options = {
    url: "/updatestatus",
    method: "put",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    data: {
      id,
      userId,
      status,
    },
  };

  return async (dispatch) => {
    await axios(options).then((response) => {
      toast(" Status updated  successfully!", {
        type: "success",
      });
    });
  };
};

export const fetchToDoList = (userId) => {
  const options = {
    url: `/fetchlist/${userId}`,
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    params: { userId },
  };

  return async (dispatch) => {
    try {
      dispatch(toDoRequest());
      const res = await axios(options);
      dispatch(todoSuccess(res.data));
    } catch {
      toast(" Error in fetching todo list!", { type: "error" });
    }
  };
};

export const uploadProfile = (id, data) => {
  const options = {
    url: `/uploadprofile/${id}`,
    method: "put",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },

    data,
  };
  return async (dispatch) => {
    try {
      dispatch(toDoRequest());
      const res = await axios(options);
      const user = res.data;
      dispatch(getUser(user));
      toast("uploaded successfully!", { type: "success" });
    } catch {
      toast("uploading failed!", { type: "error" });
    }
  };
};

export const removeProfile = (id, data) => {
  const options = {
    url: `/uploadprofile/${id}`,
    method: "put",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    data,
  };

  return async (dispatch) => {
    try {
      const res = await axios(options);
      const user = res.data;
      dispatch(getUser(user));
      toast("removed  successfully!", { type: "success" });
    } catch {
      toast("profile not removed", { type: "error" });
    }
  };
};
