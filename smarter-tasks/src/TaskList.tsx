import Task from './Task';
import { Task as TaskType } from './types';

interface TaskListProps {
  tasks: TaskType[];
  deleteTask: (id: number) => void;
}

export default function TaskList({ tasks, deleteTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="TaskItem">
            <Task task={task} />
            <button
              className="deleteTaskButton"
              onClick={() => deleteTask(task.id)}
            >
              ❌ Delete
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
