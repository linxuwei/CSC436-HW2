import Todo from "./Todo";

export default function Todolist({ todos = [] }) {
  return (
    <div>
      {todos.length === 0 && <h2>No TO-DO found</h2>}
      {todos.length > 0 &&
        todos.map((p, i) => <Todo {...p} key={p._id || p.id} />)}
    </div>
  );
}
