import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateTodo({ username, handleAddTodo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
//   const {username} = user;

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(evt) {
    setContent(evt.target.value);
  }

  function handleCreate(evt) {
    const nowDate = new Date(Date.now());
    const newTodo = {
      title,
      content,
      author: username,
      createDate: nowDate.toString(),
      isComplete: false,
      completeDate: null,
      uuid: uuidv4(),
    };
    handleAddTodo(newTodo);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        {" "}
        Author: <b>{username}</b>
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
  );
}
