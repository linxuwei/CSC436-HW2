import Todo from "./Todo";
import { v4 as uuid4} from "uuid";

export default function Todolist({ todos=[]}) {
  return (
    <div>
      {todos.map((p, i) => (
        <Todo {...p} key={uuid4()}
        />
      ))}
    </div>
  );
}
