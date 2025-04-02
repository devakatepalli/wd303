import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "./types";

const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskApp;
