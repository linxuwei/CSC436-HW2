import CreateTodo from "./CreateTodo";
import Todolist from "./Todolist";
import UserBar from "./UserBar";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import { ThemeContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";
import { StateContext } from "./contexts";
import appReducer from "./reducer";

function App() {
  const nowDate = new Date(Date.now());
  const initalTodo = [
    {
      title: "React Example",
      content: "The greatst thing since slice",
      author: "Steve Jackson",
      createDate: nowDate.toString(),
      isComplete: false,
      completeDate: null,
      uuid: uuidv4(),
    },
    {
      title: "UseState Example",
      content: "This is thest 2 and you",
      author: "Paul Duszak",
      createDate: nowDate.toString(),
      isComplete: false,
      completeDate: null,
      uuid: uuidv4(),
    },
    {
      title: "JavaScript Example",
      content: "Whos the greates guys in the workd",
      author: "Xuwel Lin",
      createDate: nowDate.toString(),
      isComplete: false,
      completeDate: null,
      uuid: uuidv4(),
    },
  ];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initalTodo,
  });

  const { user, todos } = state;
  const { username, loggedIn } = user;

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);


  const handleClickComplete = (uuid) => {
    dispatch({type:"TOGGLE_TODO", uuid});
  };

  const handleDelete = (uuid) =>{
    dispatch({type:"DELETE_TODO", uuid});
  }

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="My Blog" />　
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          {loggedIn && (
            <CreateTodo user={username} handleAddTodo={handleAddTodo} />
          )}
          <Todolist todos={todos} handleClickComplete={handleClickComplete} handleDelete={handleDelete} />
          {loggedIn && (
            <CreateTodo user={username} handleAddTodo={handleAddTodo} />
          )}
          <Todolist todos={todos} handleClickComplete={handleClickComplete} handleDelete={handleDelete} />
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
