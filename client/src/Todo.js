import { useContext, useEffect, useState } from "react";
import { StateContext, ThemeContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Todo({
  title,
  content,
  author,
  createDate,
  isComplete,
  completeDate,
  _id,
}) {
  const { secondaryColor } = useContext(ThemeContext);
  const { state, dispatch: dispatchTodo } = useContext(StateContext);
  const { user } = state;
  const [dTodo, deleteTodo] = useResource(() => ({
    url: "/todo/" + _id,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const [tTodo, toggleTodo] = useResource(
    ({
      title,
      content,
      author,
      createDate,
      isComplete,
      completeDate,
      _id,
    }) => ({
      url: "/todo/" + _id,
      method: "put",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        title,
        content,
        author,
        createDate,
        isComplete,
        completeDate,
        _id,
      },
    })
  );

  const handleDelete = (_id) => {
    deleteTodo(_id);
    dispatchTodo({ type: "DELETE_TODO", _id });
  };

  const nowDate = new Date(Date.now());
  const handleClickComplete = async (_id) => {
    toggleTodo({
      title,
      content,
      author,
      createDate,
      isComplete: !isComplete,
      completeDate: isComplete ? null : nowDate.toString(),
      _id,
    });
  };

  useEffect(() => {
    if (tTodo && tTodo.isLoading === false && tTodo.data) {
      dispatchTodo({
        type: "TOGGLE_TODO",
        _id,
      });
    }
  }, [tTodo.data]);

  useEffect(() => {
    if (dTodo && dTodo.isLoading === false && dTodo.data) {
      dispatchTodo({ type: "DELETE_TODO", _id, });
    }
  }, [dTodo.data]);

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>
        {" "}
        Written by <b> {user.username} </b>
      </i>
      <br />
      <i> Create Date: {createDate} </i>
      <br />
      <i>
        {" "}
        To-Do status:{" "}
        {user && (
          <input
            type="checkbox"
            value="Complete"
            checked={isComplete}
            onChange={() => handleClickComplete(_id)}
          />
        )}
        {isComplete ? "Completed" : "Incomplete"}{" "}
      </i>
      <br />
      <i> Completed Date: {completeDate} </i>
      <br />
      {user && <button onClick={handleDelete}> Delete </button>}
      <br />
    </div>
  );
}