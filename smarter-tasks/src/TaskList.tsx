import Task from "./Task";
import { Task as TaskType } from "./types";

interface TaskListProps {
  tasks: TaskType[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="TaskItem">
            <Task task={task} />
          </div>
        ))
      )}
    </div>
  );  
}