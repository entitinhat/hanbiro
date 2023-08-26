import { User } from '@base/types/user';
import { IdName } from '@base/types/common';

export type QAType = 'PLANNING' | 'TASK' | 'TEMPLATE';
export type TaskType = 'PLANNING' | 'DASHBOARD' | 'PROJECT';

export interface BaseTask {
  id: string;
  name: string;
  pageType: IdName;
  devType: IdName;
  devSource: IdName;
  devCostType: IdName;
  estimatedTime: string;
  description: string;
  createdAt: Date;
  createdBy?: User;
}

export interface BaseTaskGroup {
  id: string;
  name: string;
  description: string;
}

export interface Task extends BaseTask {
  project: IdName;
  planning: IdName;
  priority: string;
  tags: string[];
  status: string;
  assignTo: User[];
  startDate: Date;
  dueDate: Date;
  instruction: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  new?: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  done?: boolean;
  doneBy?: User;
  doneAt?: Date;
  new?: boolean;
}

export interface FinishingQA {
  id: string;
  subject: string;
  checklist: Checklist[];
  new?: boolean;
  edit?: boolean;
}

export interface TasksResponse {
  results: Task[];
}
