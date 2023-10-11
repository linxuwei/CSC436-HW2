import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

export default function Todolist({todos=[]}) {
    return (
        <div>
            {todos.map((p,i)=> (
                <Todo {...p} key={uuidv4()} />
                ))}
        </div>
    )
}