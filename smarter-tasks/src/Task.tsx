import React from "react";
import "./TaskCard.css";

// Define types for the props
interface TaskCardProps {
  title: string;
  dueDate?: string; // Only for pending tasks
  completedAtDate?: string; // Only for completed tasks
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
    <div className="TaskItem"> {/* Changed from task-card to TaskItem */}
      <h3 className="task-title">{title}</h3>
      
      {/* Show only the appropriate date */}
      {completedAtDate ? (
        <p className="task-meta" style={{ color: "green" }}>
          Completed on: {completedAtDate}
        </p>
      ) : (
        dueDate && <p className="task-meta">Due on: {dueDate}</p>
      )}

      <p className="task-meta">Assignee: {assigneeName}</p>
    </div>
  );
};

export default TaskCard;
