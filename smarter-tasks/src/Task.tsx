import React from 'react';
import { Task as TaskType } from './types';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  if (!task) return null;

  return (
    <>
      <h3 className="task-title">
        {task.title} ({task.dueDate})
      </h3>
      <p className="task-meta">{task.description}</p>
    </>
  );
};

export default Task;
