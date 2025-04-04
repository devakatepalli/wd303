import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { Task } from "./types";
import "./TaskCard.css";

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="task-app">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

// TaskForm.tsx
import React, { useState } from "react";
import { Task } from "./types";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate.trim()) {
      alert("Title and Due Date are required!");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        id="todoTitle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <input
        id="todoDescription"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <input
        id="todoDueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button id="addTaskButton" type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;