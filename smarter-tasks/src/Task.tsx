import React from "react";
import { Task as TaskType } from "./types";

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="TaskItem task-card">
      <h3 className="task-title">
        {task.title} ({task.dueDate})
      </h3>
      <p className="task-meta">{task.description}</p>
    </div>
  );
};

export default Task;
