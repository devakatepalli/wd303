import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task } from "./types";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedPending = JSON.parse(localStorage.getItem("pendingTasks") || "[]");
    const savedDone = JSON.parse(localStorage.getItem("doneTasks") || "[]");
    const allTasks: Task[] = [...savedPending, ...savedDone];
    const foundTask = allTasks.find((t) => t.id === Number(id));
    setTask(foundTask || null);
  }, [id]);

  if (!task) {
    return <div className="text-center mt-10 text-red-500">Task not found</div>;
  }

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-semibold">Task Details</h2>
      <h3 className="text-lg font-bold mt-4">{task.title}</h3>
      <p className="mt-2">Due Date: {task.dueDate}</p>
      <p className="mt-2">Description: {task.description}</p>
      <p className="mt-2">Assignee: {task.assigneeName}</p>
      {task.completedAtDate && <p className="mt-2">Completed At: {task.completedAtDate}</p>}
    </div>
  );
}
