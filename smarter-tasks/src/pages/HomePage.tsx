import { useAuth } from "../AuthContext";

export default function HomePage() {
  const { signOut } = useAuth();

  return (
    <div>
      <nav>
        <button onClick={signOut}>Sign out</button>
      </nav>
      <h1>Home</h1>
    </div>
  );
}
