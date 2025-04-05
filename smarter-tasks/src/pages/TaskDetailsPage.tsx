import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TaskItem } from '../types';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [taskAppState] = useLocalStorage<{ tasks: TaskItem[] }>('tasks', { tasks: [] });

  const task = taskAppState.tasks.find(task => task.id.toString() === id);

  if (!task) return <p className="text-center text-red-500">Task not found!</p>;

  return (
    <div className="bg-white shadow-md rounded-md p-4 m-8">
      <h3 className="text-lg font-medium">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-gray-600">{task.dueDate}</p>
    </div>
  );
};

export default TaskDetailsPage;
