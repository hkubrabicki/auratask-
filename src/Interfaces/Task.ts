export type TaskCategory = 'Work' | 'Personal' | 'Health' | 'Education' | 'Other';
export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Todo' | 'In_Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface TaskStatsData {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  completionRate: number;
}
