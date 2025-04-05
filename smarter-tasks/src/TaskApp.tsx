// TaskApp.js
import { useState } from 'react';
import TaskList from './TaskList';
import { Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import './TaskCard.css';
import TaskForm from './TaskForm';

export default function TaskApp() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (!title.trim() || !dueDate.trim()) {
      alert('Title and Due Date are required!');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description: description || 'No description',
      dueDate,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-app">
      <h1>Task Manager</h1>
      <div className="task-form">
        <label htmlFor="todoTitle">Title:</label>
        <input id="todoTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} />

        <label htmlFor="todoDescription">Description:</label>
        <input
          id="todoDescription"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label htmlFor="todoDueDate">Due Date:</label>
        <input
          id="todoDueDate"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <button id="addTaskButton" onClick={addTask} disabled={!title.trim() || !dueDate.trim()}>
          Add Task
        </button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}
