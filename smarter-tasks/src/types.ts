export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  assigneeName: string;
  completedAtDate?: string;
};
