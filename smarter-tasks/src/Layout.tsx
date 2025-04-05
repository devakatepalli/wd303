// Layout.tsx
import Navbar from "./components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/notfound';
  const showNav = !isNotFoundPage && location.pathname !== "/signin";

  return (
    <div>
      {showNav && <Navbar />}
      {!isNotFoundPage && <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>}
      {children}
    </div>
  );
}
