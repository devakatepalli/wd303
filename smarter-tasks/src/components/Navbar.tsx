// components/Navbar.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <button className="mr-4" onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/tasks")}>Tasks</button>
      </div>
      <button onClick={() => {
        logout();
        navigate("/signin");
      }}>Logout</button>
    </nav>
  );
}
