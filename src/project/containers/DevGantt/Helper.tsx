import { Task } from '@project/types/task';
import { Task as GanttTask } from '@third-party/gantt-task-react';
import dayjs from 'dayjs';

import { NewTask } from './TaskListTable';

export function initTasks(items: Task[]) {
  if (items.length === 0) return [];
  const tasks: NewTask[] = items?.map((v, index) => {
    console.log('new task', v)
    return {
      start: dayjs(v.startDate).toDate(),
      end: dayjs(v.dueDate).toDate(),
      name: v.name,
      id: v.id,
      progress: 45, // time entries : estimated time / task : estimated time
      type: 'task',
      // dependencies: ['Task 0'],
      // links: [
      //   {
      //     target: 'Task 0',
      //     type: 'EndToStart', StartToEnd, EndToEnd, StartToStart
      //   }
      // ],
      assignTo: v.assignTo,
      displayOrder: index + 1
    };
  });

  return tasks;
}

export function getStartEndDateForProject(tasks: GanttTask[], projectId: string) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
