import { Task as TaskType } from "./types";
import "./TaskCard.css";

interface TaskProps {
  task: TaskType;
}

export default function Task({ task }: TaskProps) {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-meta">Due Date: {task.dueDate}</p>
      {task.description && <p className="task-meta">{task.description}</p>}
    </div>
  );
}