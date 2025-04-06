// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import SignInPage from './pages/Signin';
import HomePage from './pages/HomePage';
import TasksPage from './TaskApp';
import TaskDetailsPage from './pages/TaskDetailsPage';
import NotFound from './pages/Notfound';
import Navbar from './components/Navbar';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/notfound';
  return (
    <div>
      {!isNotFoundPage && <Navbar />}
      {children}
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/home' : '/signin'} />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Layout>
              <TasksPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <TaskDetailsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notfound"
        element={
          <ProtectedRoute>
            <Layout>
              <NotFound />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
