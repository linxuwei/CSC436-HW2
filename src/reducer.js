import { v4 as uuidv4 } from "uuid";

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
        return {username:action.username, loggedIn:true};
    case "REGISTER":
      return {username:action.username, loggedIn:true};
    case "LOGOUT":
      return {username:"", loggedIn:false};
    default:
      return state;
  }
}

function todoReduer(state, action) {
  const nowDate = new Date(Date.now());
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        content: action.content,
        author: action.author,
        createDate: nowDate.toString(),
        isComplete: false,
        completeDate: null,
        uuid: uuidv4(),
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
        return state.map((todo) => {
            if(todo.uuid === action.uuid){
                return {
                    ...todo,
                    isComplete:!todo.isComplete,
                    completeDate:todo.isComplete ? null:nowDate.toString(),
                };
            }
            return todo;
        })
    case "DELETE_TODO":
        return state.filter((todo) => todo.uuid !== action.uuid );
    default:
      return state;
  }
}
export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReduer(state.todos, action),
  };
}
