import axios from "axios";

export function fetchTodos() {
  return axios
    .get("/api/todos/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}

export function updateTodo(item) {
  axios.put(`/api/todos/${item.id}/`, item).then((res) => res.data);
}

export function removeTodo(item) {
  axios.delete(`/api/todos/${item.id}/`).then((res) => res.data);
}

export function addTodo(item) {
  axios
    .post("/api/todos/", item)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
}
