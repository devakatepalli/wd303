// Task.tsx
import { Link } from "react-router-dom";
import { Task } from "./types";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div>
      <Link to={`/tasks/${task.id}`}>
        <h3 className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline">{task.title}</h3>
      </Link>
      <p>Due: {task.dueDate}</p>
      <p>Assignee: {task.assigneeName}</p>
      <p>{task.description}</p>
    </div>
  );
}
