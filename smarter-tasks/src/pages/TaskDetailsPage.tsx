import { useParams } from "react-router-dom";

export default function TaskDetailsPage() {
  const { id } = useParams();
  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-semibold">Task Details</h2>
      <p>Task ID: {id}</p>
    </div>
  );
}
