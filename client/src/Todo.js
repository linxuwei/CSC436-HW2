import { useContext } from "react";
import { StateContext, ThemeContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Todo({
  title,
  content,
  author,
  createDate,
  isComplete,
  completeDate,
  id,
}) {
  const { secondaryColor } = useContext(ThemeContext);
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [dTodo, deleteTodo] = useResource((id) => ({
    url: "/todos/" + id,
    method: "delete",
  }));

  const [tTodo, toggleTodo] = useResource(
    ({ title, content, author, createDate, isComplete, completeDate, id }) => ({
      url: "/todos/" + id,
      method: "put",
      data: {
        title,
        content,
        author,
        createDate,
        isComplete,
        completeDate,
        id,
      },
    })
  );

  const handleDelete = () => {
    deleteTodo(id);
    dispatch({ type: "DELETE_TODO", id });
  };

  const nowDate = new Date(Date.now());
  const handleClickComplete = () => {
    toggleTodo({
      title,
      content,
      author,
      createDate,
      isComplete: !isComplete,
      completeDate: isComplete ? null : nowDate.toString(),
      id,
    });
    dispatch({ type: "TOGGLE_TODO", id });
  };

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>
        {" "}
        Written by <b> {author} </b>
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
            onChange={() => handleClickComplete(id)}
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
