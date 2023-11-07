import CreateTodo from "./CreateTodo";
import Todolist from "./Todolist";
import UserBar from "./UserBar";
import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import { ThemeContext } from "./contexts";
import ChangeTheme from "./ChangeTheme";
import { StateContext } from "./contexts";
import appReducer from "./reducer";
import { useResource } from "react-request-hook";

function App() {
  const [todosResponse, getTodos] = useResource(() => ({
    url:'/todos',
    method:'get'
  }));


  useEffect(getTodos,[]);
  useEffect(() => {
    if(todosResponse && todosResponse.data){
      dispatch({type:'FETCH_TODOS',todos:todosResponse.data.reverse()})
    }
  },[todosResponse]);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const { user, todos } = state;

  const [theme, setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  });


  useEffect(() => {
    if (user) {
      document.title = `${user}'s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);
  //console.log("loggedIn:", loggedIn);
  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="My Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          <CreateTodo />
          <Todolist todos={todos} />
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
