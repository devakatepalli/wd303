import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import TaskCard from './Task';
import NotFound from './pages/Notfound';
import ProtectedRoute from './ProtectedRoute'; // Ensure this file exists and exports correctly
import SignInPage from "./pages/SignInPage";
import { AuthProvider, useAuth } from "./AuthContext";
import HomePage from "./pages/HomePage"; // ✅ this is missing
import TasksPage from './TaskApp';// ✅ Fix the import!
import TaskDetailsPage from "./pages/TaskDetailsPage";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completedAtDate?: string;
  assigneeName: string;
  description?: string;
}

// Wrapper to conditionally hide components like Header
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/notfound';
  return (
    <div>
      {!isNotFoundPage && <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>}
      {children}
    </div>
  );
}

function TaskApp() {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeName, setAssigneeName] = useState('');

  useEffect(() => {
    const savedPending = localStorage.getItem('pendingTasks');
    const savedDone = localStorage.getItem('doneTasks');

    if (savedPending) setPendingTasks(JSON.parse(savedPending));
    if (savedDone) setDoneTasks(JSON.parse(savedDone));
  }, []);

  useEffect(() => {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }, [pendingTasks, doneTasks]);

  const addTask = () => {
    if (!title.trim() || !dueDate.trim() || !description.trim() || !assigneeName.trim()) {
      alert("All fields are required.");
      return;
    }
    

    const newTask: Task = {
      id: Date.now(),
      title,
      dueDate,
      description: description.trim() || 'No description',
      assigneeName: assigneeName.trim() || 'Unassigned',
    };

    setPendingTasks(prev => [...prev, newTask]);
    setTitle('');
    setDueDate('');
    setDescription('');
    setAssigneeName('');
  };

  const markAsDone = (taskId: number) => {
    setPendingTasks(prev =>
      prev.filter(task => {
        if (task.id === taskId) {
          setDoneTasks(donePrev => [
            ...donePrev,
            { ...task, completedAtDate: new Date().toISOString().split('T')[0] },
          ]);
        }
        return task.id !== taskId;
      })
    );
  };

  const deleteTask = (taskId: number, isPending: boolean) => {
    if (isPending) {
      setPendingTasks(prev => prev.filter(t => t.id !== taskId));
    } else {
      setDoneTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <input
          id="todoTitle"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          id="todoDueDate"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <textarea
          id="todoDescription"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
          placeholder="Task Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          id="todoAssignee"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
          type="text"
          placeholder="Assignee Name"
          value={assigneeName}
          onChange={e => setAssigneeName(e.target.value)}
        />
        <button
          id="addTaskButton"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending</h2>
          {pendingTasks.map(task => (
            <div key={task.id} className="TaskItem p-4 bg-white shadow-md rounded mb-2">
              <TaskCard task={task} />
              <button
                className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                onClick={() => markAsDone(task.id)}
              >
                Done
              </button>
              <button
                className="deleteTaskButton px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteTask(task.id, true)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Done</h2>
          {doneTasks.map(task => (
            <div key={task.id} className="TaskItem p-4 bg-gray-200 shadow-md rounded mb-2">
              <TaskCard task={task} />
              <button
                className="deleteTaskButton px-3 py-1 bg-red-500 text-white rounded"
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

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailsPage /></ProtectedRoute>} />
      <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TaskApp /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
