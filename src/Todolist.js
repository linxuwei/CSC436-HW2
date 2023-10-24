import Todo from "./Todo";

export default function Todolist(props) {
  return (
    <div>
      {props.todos.map((p, i) => (
        <Todo
          todo={p}
          key={p.uuid}
          handleClickComplete={props.handleClickComplete}
          handleDelete={props.handleDelete}
        />
      ))}
    </div>
  );
}
