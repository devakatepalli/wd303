import React from "react";
import "./TaskCard.css";

// Define the types for the props
interface TaskCardProps {
  title: string;
  dueDate?: string; // Optional for pending tasks
  completedAtDate?: string; // Optional for completed tasks
  assigneeName: string;
}

// Define and export TaskCard as default
const TaskCard: React.FC<TaskCardProps> = ({
  title,
  dueDate,
  completedAtDate,
  assigneeName,
}) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      {dueDate && <p className="task-meta">Due on: {dueDate}</p>}
      {completedAtDate && (
        <p className="task-meta" style={{ color: "green" }}>
          Completed on: {completedAtDate}
        </p>
      )}
      <p className="task-meta">Assignee: {assigneeName}</p>
    </div>
  );
};

export default TaskCard; // ✅ Ensure this is a default export
