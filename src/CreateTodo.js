
import { useState } from "react";
export default function CreateTodo ({user, handleAddTodo}){

    const[title,setTitle]= useState('')
    const[content,setContent] = useState('')
    
    function handleTitle(evt){
        setTitle(evt.target.value);
    }
    function handleContent(evt){
        setContent(evt.target.value);
    }

    function handleCreate(evt){
        const nowDate=new Date(Date.now());
        const newTodo = { title, content, author: user, createDate:nowDate.toString()};
        handleAddTodo(newTodo);
    }

    return (
        <form onSubmit={e => {e.preventDefault(); handleCreate()}}>
            <div> Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
            </div>
            <textarea value={content} onChange={handleContent} />
            <input type="submit" value="Create NEW to-do" disabled={title.length === 0} />
        </form>
    )
}