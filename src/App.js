
import CreateTodo from "./CreateTodo";
import Todolist from "./Todolist";
import UserBar from "./UserBar"; 
import { useState } from "react";

function App() {
  const [user,setUser] = useState('')
  const nowDate=new Date(Date.now());
  
  const initalTodo=[
    {title:"React Example", content:"The greatst thing since slice", author:"Steve Jackson", createDate:nowDate.toString(), 
  isComplete: false, completeDate:null},
    {title:"UseState Example", content:"This is thest 2 and you", author:"Paul Duszak", createDate:nowDate.toString(),
    isComplete: false, completeDate:null},
    {title:"JavaScript Example", content:"Whos the greates guys in the workd", author:"Xuwel Lin", createDate:nowDate.toString(),
    isComplete: false, completeDate:null},
  ];

  const [todos,setTodos] = useState(initalTodo);
  const handleAddTodo = (newTodo)=>{ setTodos([newTodo, ...todos]);
  };

  return (
    <div>
      <UserBar user={user} setUser={setUser} /> 
      <CreateTodo user={user} handleAddTodo={handleAddTodo} />
      <Todolist todos={todos} setPosts={setTodos} />
    </div>
  )
}

export default App;
