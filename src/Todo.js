import { useContext } from "react";
import { ThemeContext } from "./contexts";

export default function Todo(props) {
  const { secondaryColor } = useContext(ThemeContext);

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{props.todo.title}</h3>
      <div>{props.todo.content}</div>
      <br />
      <i>
        {" "}
        Written by <b> {props.todo.author} </b>
      </i>
      <br />
      <i> Create Date: {props.todo.createDate} </i>
      <br />
      <i>
        {" "}
        To-Do status:{" "}
        <input
          type="checkbox"
          value="Complete"
          checked={props.todo.isComplete}
          onChange={() => props.handleClickComplete(props.todo.uuid)}
        />
        {props.todo.isComplete ? "Completed" : "Incomplete"}{" "}
      </i>
      <br />
      <i> Completed Date: {props.todo.completeDate} </i>
      <br />
    </div>
  );
}
