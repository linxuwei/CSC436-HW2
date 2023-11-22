import { useContext, useState,useEffect } from "react";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "./contexts";


export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [todo, createTodo] = useResource(
    ({ title, content, author, createDate, isComplete, completeDate,_id }) => ({
      url: "/todo",
      method: "post",
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
        author: user.username,
        createDate: nowDate.toString(),
        isComplete: false,
        completeDate: null,
        _id:uuidv4(),
      };
      createTodo(newTodo);
      console.log("L52 - ID from handleCreate():", todo._id);
      // dispatch({
      //   type: "CREATE_TODO",
      //   ...newTodo,
      // });
    } else {
      console.log("User is not login");
    }
  }


  useEffect(() => {
    if (todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        // title: todo.data.title,
        // content: todo.data.content,
        // _id: todo.data.id,
        // author: user.username,
        // completeDate:todo.data.completeDate,
        // isComplete:todo.data.isComplete,
        // createDate:todo.data.createDate,
        ...todo.data
      });
      console.log("L75 - TODO.Data",todo.data);
    }
  }, [todo.data]);

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
            Author: <b>{user.username}</b>
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
