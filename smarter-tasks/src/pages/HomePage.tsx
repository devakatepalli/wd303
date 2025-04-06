import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Task App!</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/tasks")}
      >
        Go to Tasks
      </button>
      <button
        id="logoutBtn"
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
