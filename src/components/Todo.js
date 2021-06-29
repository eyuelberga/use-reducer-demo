import React from "react";

const Post = ({ id, title, completed, onCompleteTodoHandler }) => {
  return (
    <li class="collection-item">
      <div style={completed ? { textDecoration: "line-through" } : undefined}>
        {title}
        {!completed && (
          <a href="#!" class="secondary-content">
            <button
              class="waves-effect waves-light btn btn-small"
              onClick={onCompleteTodoHandler}
            >
              <i class="material-icons left">check</i>Done
            </button>
          </a>
        )}
      </div>
    </li>
  );
};

export default Post;
