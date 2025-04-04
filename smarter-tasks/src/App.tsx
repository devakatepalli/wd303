import { useState } from 'react';
import TaskCard from './Task';

// Define the type for the task objects
interface Task {
  id: number;
  title: string;
  dueDate?: string; // Optional dueDate for pending tasks
  completedAtDate?: string; // Optional completedAtDate for done tasks
  assigneeName: string;
  description?: string; // Optional description for the task
}

export default function App() {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeName, setAssigneeName] = useState('');

  // Add a new task to pending tasks
  const addTask = () => {
    if (!title || !dueDate) {
      alert('Title and Due Date are required.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      dueDate,
      description,
      assigneeName: assigneeName || 'Unassigned',
    };

    setPendingTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle('');
    setDueDate('');
    setDescription('');
    setAssigneeName('');
  };

  // Mark a task as done
  const markAsDone = (taskId: number) => {
    const task = pendingTasks.find((task) => task.id === taskId);
    if (task) {
      setPendingTasks((prev) => prev.filter((t) => t.id !== taskId));
      setDoneTasks((prev) => [
        ...prev,
        { ...task, completedAtDate: new Date().toISOString().split('T')[0] },
      ]);
    }
  };

  // Delete a task
  const deleteTask = (taskId: number, isPending: boolean) => {
    if (isPending) {
      setPendingTasks((prev) => prev.filter((t) => t.id !== taskId));
    } else {
      setDoneTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

      {/* Add Task Form */}
      <div className="mb-6">
        <input
          id="todoTitle"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id="todoDueDate"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <textarea
          id="todoDescription"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          id="todoAssignee"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
          type="text"
          placeholder="Assignee Name"
          value={assigneeName}
          onChange={(e) => setAssigneeName(e.target.value)}
        />
        <button
          id="addTaskButton"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending</h2>
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="TaskItem p-4 bg-white shadow-md rounded mb-2"
            >
              <TaskCard {...task} />
              <button
                className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                onClick={() => markAsDone(task.id)}
              >
                Done
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteTask(task.id, true)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Done Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Done</h2>
          {doneTasks.map((task) => (
            <div
              key={task.id}
              className="TaskItem p-4 bg-gray-200 shadow-md rounded mb-2"
            >
              <TaskCard {...task} />
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteTask(task.id, false)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
