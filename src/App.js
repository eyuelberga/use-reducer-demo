import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error"
};
function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState(null);
  const onCompleteTodoHandler = async todo => {
    const completed = { ...todo, completed: true };
    const todoIndex = todos.map(({ id }) => id).indexOf(todo.id);
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        completed
      );
      setTodos([
        ...todos.slice(0, todoIndex),
        completed,
        ...todos.slice(todoIndex + 1)
      ]);
    } catch (e) {
      setError(e);
      setStatus(REQUEST_STATUS.ERROR);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setTodos(response.data);
        setStatus(REQUEST_STATUS.SUCCESS);
      } catch (e) {
        setError(e);
        setStatus(REQUEST_STATUS.ERROR);
      }
    };
    fetch();
  }, []);

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasFailed = status === REQUEST_STATUS.ERROR;

  return (
    <div class="container">
      <ul class="collection with-header">
        <li class="collection-header">
          <h4>Todo List</h4>
        </li>
        {isLoading && (
          <div
            class="preloader-wrapper big active"
            style={{ marginLeft: "50%", marginTop: "20px" }}
          >
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        )}
        {hasFailed && (
          <div class="row">
            <div class="col s12">
              <div class="card-panel red">
                <h5 class="card-title white-text">Request Failed!</h5>
                <p class="white-text">{error.message}</p>
              </div>
            </div>
          </div>
        )}
        {success &&
          todos.map(({ title, completed, id }) => {
            return (
              <Todo
                key={id}
                title={title}
                completed={completed}
                onCompleteTodoHandler={() => {
                  onCompleteTodoHandler({ title, completed, id });
                }}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
