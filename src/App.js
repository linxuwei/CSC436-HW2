
import CreateTodo from "./CreateTodo";
import Todolist from "./Todolist";
import UserBar from "./UserBar"; 
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [user,setUser] = useState('')
  const nowDate=new Date(Date.now());
  
  const initalTodo=[
    {title:"React Example", content:"The greatst thing since slice", author:"Steve Jackson", createDate:nowDate.toString(), 
  isComplete: false, completeDate:null, uuid:uuidv4()},
    {title:"UseState Example", content:"This is thest 2 and you", author:"Paul Duszak", createDate:nowDate.toString(),
    isComplete: false, completeDate:null,uuid:uuidv4()},
    {title:"JavaScript Example", content:"Whos the greates guys in the workd", author:"Xuwel Lin", createDate:nowDate.toString(),
    isComplete: false, completeDate:null,uuid:uuidv4()},
  ];

  const [todos,setTodos] = useState(initalTodo);
  const handleAddTodo = (newTodo)=>{ setTodos([newTodo, ...todos]);
  };
  
  const handleClickComplete= (uuid) => {
    const nowDate=new Date(Date.now());
    const newTodos=todos.map(todo => {
      if(todo.uuid === uuid){
        return {...todo, isComplete:!todo.isComplete,completeDate:todo.isComplete ? null:nowDate.toString()};
      }else{
        return todo;
      }
    });
    setTodos(newTodos);
   };

  return (
    <div>
      <UserBar user={user} setUser={setUser} /> 
      <CreateTodo user={user} handleAddTodo={handleAddTodo} />
      <Todolist todos={todos} handleClickComplete={handleClickComplete} />
    </div>
  )
}

export default App;
