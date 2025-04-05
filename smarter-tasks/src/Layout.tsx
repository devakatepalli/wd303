import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-white px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-700">Oops! This page does not exist.</p>
      <button
        id="backToHomeButton"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate('/')}
      >
        Go to Homepage
      </button>
    </div>
  );
}
