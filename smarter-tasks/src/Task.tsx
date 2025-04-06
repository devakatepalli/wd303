import { Task } from "./types";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div>
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Assignee:</strong> {task.assigneeName}</p>
      {task.completedAtDate && (
        <p><strong>Completed on:</strong> {task.completedAtDate}</p>
      )}
    </div>
  );
}
