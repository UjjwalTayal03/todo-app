import { useState, useEffect } from "react";
import api from "../services/api";

import React from 'react'

export default function Todo() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")

    const fetchTasks = async () => {
        const res = await api.get("/tasks")
        setTasks(res.data)
    }

    useEffect(()=>{
        fetchTasks()
    },[])

    const addTask = async () =>{
        await api.post("/tasks", {title})
        setTitle("")
        fetchTasks()
    }

    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`)
        fetchTasks()
    }
  return (
    <div>
        <h2>My Tasks</h2>
        <input type="text" value={title} placeholder="New task" onChange={(e)=>{setTitle(e.target.value)}} />
        <button onClick={addTask}>Add</button>
        <ul>
            {tasks.map((t)=>(
                <li key={t._id}>
                    {t.title}
                    <button onClick={()=>deleteTask(t._id)}>❌</button>
                </li>
            ))}
        </ul>
    </div>
  )
}
