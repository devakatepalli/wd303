import Task from "./Task";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task) => <Task key={task.id} task={task} />)
      )}
    </div>
  );
}


export default TaskList;
