import { useState } from "react";
import TaskCard from "./Task";

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
  // State for the pending tasks
  const [pendingTasks, setPendingTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React project",
      dueDate: "2025-04-05",
      assigneeName: "Alice",
    },
    {
      id: 2,
      title: "Prepare for meeting",
      dueDate: "2025-04-06",
      assigneeName: "Bob",
    },
  ]);

  // State for the done tasks
  const [doneTasks, setDoneTasks] = useState<Task[]>([
    {
      id: 3,
      title: "Submit report",
      completedAtDate: "2025-03-30",
      assigneeName: "Charlie",
    },
    {
      id: 4,
      title: "Fix UI bug",
      completedAtDate: "2025-03-29",
      assigneeName: "David",
    },
  ]);

  // States for form inputs
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assigneeName, setAssigneeName] = useState<string>("");

  // Function to handle adding a new task
  const addTask = () => {
    // Validation to check if title and dueDate are provided
    if (!title || !dueDate) {
      alert("Title and Due Date are required.");
      return;
    }

    // Create a new task object
    const newTask: Task = {
      id: Date.now(), // Unique ID for the task
      title,
      dueDate,
      description,
      assigneeName,
    };

    // Add the new task to pending tasks
    setPendingTasks((prevTasks) => [...prevTasks, newTask]);

    // Reset form inputs after adding the task
    setTitle("");
    setDueDate("");
    setDescription("");
    setAssigneeName("");
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
            <div key={task.id} className="TaskItem">
              <TaskCard
                title={task.title}
                dueDate={task.dueDate}
                assigneeName={task.assigneeName}
                description={task.description}
              />
            </div>
          ))}
        </div>

        {/* Done Tasks */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Done</h2>
          {doneTasks.map((task) => (
            <div key={task.id} className="TaskItem">
              <TaskCard
                title={task.title}
                completedAtDate={task.completedAtDate}
                assigneeName={task.assigneeName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
