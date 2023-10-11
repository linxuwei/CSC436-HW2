
import { useState } from "react";

export default function Todo({title,content,author, createDate}){
    const curDate=new Date(Date.now());
    const completeDate=curDate.toString();
    const[isComplete,setisComplete] = useState(false)
    function handleIsComplete(evt){
        setisComplete(evt.target.checked);
    }
    
    return (
        <div>
            <h3>{title}</h3>
            <div>{content}</div>
            <br />
            <i> Written by <b> {author} </b></i>
            <br />
            <i> Create Date: {createDate} </i>
            <br />
            <i> To-Do status: <input type="checkbox" value="Complete" checked={isComplete} onChange={handleIsComplete} /> 
            {isComplete ? 'Completed' : 'Incomplete'} </i>
            <br />
            <i> Completed Date: {isComplete ? completeDate : null} </i>
            <br />

        </div>
    )
}