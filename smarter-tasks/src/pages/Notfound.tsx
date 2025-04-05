import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">
        <button id="backToHomeButton">Go to Homepage</button>
      </Link>
    </div>
  );
}
