import { useState } from 'react';
import TaskList from './TaskList';
import { Task } from './types';
import { useLocalStorage } from './useLocalStorage';
import './TaskCard.css';

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

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-app">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input
          id="todoTitle"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id="todoDescription"
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          id="todoDueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          id="addTaskButton"
          onClick={addTask}
          disabled={!title || !dueDate}
        >
          Add Task
        </button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}
