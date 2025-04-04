import React from "react";
import { Task as TaskType } from "./types";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="TaskItem task-card">
      <h2 className="task-title">{task.title}</h2>
      <p className="task-meta">{task.description}</p>
      <p className="task-meta"><strong>Due:</strong> {task.dueDate}</p>
    </div>
  );
};

export default Task;
