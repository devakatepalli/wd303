import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-lg mb-4">Page not found</p>
      <button
        id="backToHomeButton"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate("/home")}
      >
        Back to Home
      </button>
    </div>
  );
}
