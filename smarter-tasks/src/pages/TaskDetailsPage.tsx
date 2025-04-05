// pages/TaskDetailsPage.tsx
import { useParams } from "react-router-dom";

export default function TaskDetailsPage() {
  const { id } = useParams();

  const allTasks = JSON.parse(localStorage.getItem("pendingTasks") || "[]")
    .concat(JSON.parse(localStorage.getItem("doneTasks") || "[]"));
  const task = allTasks.find((t: any) => t.id === parseInt(id || ""));

  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p><strong>Due:</strong> {task.dueDate}</p>
      <p><strong>Assignee:</strong> {task.assigneeName}</p>
      <p><strong>Description:</strong> {task.description}</p>
      {task.completedAtDate && <p><strong>Completed:</strong> {task.completedAtDate}</p>}
    </div>
  );
}
