import { useState, useEffect } from "react";
import api from "../services/api";
import React from "react";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Tasks</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            placeholder="New task"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center border rounded px-3 py-2"
            >
              <span
                className={`flex-1 ${
                  t.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {t.title}
              </span>

              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => toggleComplete(t._id, t.completed)}
                  className="text-green-600 hover:text-green-700"
                >
                  ✔
                </button>

                <button
                  onClick={() => deleteTask(t._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
