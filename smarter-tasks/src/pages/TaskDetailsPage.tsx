import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task } from "./types";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const allTasks = [
      ...(JSON.parse(localStorage.getItem("pendingTasks") || "[]")),
      ...(JSON.parse(localStorage.getItem("doneTasks") || "[]")),
    ];
    const found = allTasks.find((t: Task) => t.id.toString() === id);
    setTask(found || null);
  }, [id]);

  if (!task) {
    return <p className="text-center mt-10">Task not found</p>;
  }

  return (
    <div className="text-center mt-10">
      <h3 className="text-2xl font-bold">{task.title}</h3>
      <p className="mt-2">Due: {task.dueDate}</p>
      <p className="mt-2">{task.description}</p>
      <p className="mt-2">Assigned to: {task.assigneeName}</p>
    </div>
  );
}
