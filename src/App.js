import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import { REQUEST_STATUS, ACTION } from "./constants";
import requestReducer from "./reducers/request";

function App() {
  const [{ list: todos, status, error }, dispatch] = useReducer(
    requestReducer,
    {
      list: [],
      status: REQUEST_STATUS.LOADING,
      error: null
    }
  );
  const onCompleteTodoHandler = async todo => {
    const completed = { ...todo, completed: true };
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        completed
      );
      dispatch({
        type: ACTION.UPDATE_SUCCESS,
        payload: completed
      });
    } catch (e) {
      dispatch({
        type: ACTION.UPDATE_FAILURE,
        error: e
      });
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        dispatch({
          type: ACTION.FETCH_LIST_SUCCESS,
          list: response.data
        });
      } catch (e) {
        dispatch({
          type: ACTION.FETCH_LIST_FAILURE,
          error: e
        });
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
