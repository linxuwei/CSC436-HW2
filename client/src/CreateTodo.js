import { useContext, useState } from "react";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "./contexts";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [todo, createTodo] = useResource(
    ({ title, content, author, createDate, isComplete, completeDate, id }) => ({
      url: "/todos",
      method: "post",
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

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(evt) {
    setContent(evt.target.value);
  }

  function handleCreate() {
    if (user) {
      const nowDate = new Date(Date.now());
      const newTodo = {
        title,
        content,
        author: user,
        createDate: nowDate.toString(),
        isComplete: false,
        completeDate: null,
        id: uuidv4(),
      };
      createTodo(newTodo);

      dispatch({
        type: "CREATE_TODO",
        ...newTodo,
      });
    } else {
      console.log("User is not login");
    }
  }

  return (
    <div>
      {user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <div>
            {" "}
            Author: <b>{user}</b>
          </div>
          <div>
            <label htmlFor="create-title">Title:</label>
            <input
              type="text"
              value={title}
              onChange={handleTitle}
              name="create-title"
              id="create-title"
            />
          </div>
          <textarea value={content} onChange={handleContent} />
          <input
            type="submit"
            value="Create NEW to-do"
            disabled={title.length === 0}
          />
        </form>
      )}
    </div>
  );
}
