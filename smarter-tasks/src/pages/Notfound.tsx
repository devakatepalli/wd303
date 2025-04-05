import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <button
        id="backToHomeButton"
        onClick={() => navigate("/home")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Home
      </button>
    </div>
  );
}
