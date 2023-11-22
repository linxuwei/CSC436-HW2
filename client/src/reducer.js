function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "REGISTER":
      return "";
    case "LOGOUT":
      return "";
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
        _id: action._id,
      };
      return [newTodo, ...state];
    case "FETCH_TODOS":
      return action.todos;
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo._id === action._id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
            completeDate: todo.isComplete ? null : nowDate.toString(),
          };
        }
        return todo;
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo._id !== action._id);
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
