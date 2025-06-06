import React, { useState } from 'react';
import { Task } from './types';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assigneeName, setAssigneeName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !dueDate.trim()) {
      alert('Title and Due Date are required!');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      assigneeName,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssigneeName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="todoTitle"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <input
        id="todoDescription"
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Task description"
      />
      <input
        id="todoDueDate"
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        required
      />
      <input
        id="todoAssignee"
        type="text"
        value={assigneeName}
        onChange={e => setAssigneeName(e.target.value)}
        placeholder="Assignee name"
      />
      <button id="addTaskButton" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;