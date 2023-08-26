export enum ICategory {
  FEATURE = 'feature',
  BUG = 'bug',
  REFACTOR = 'refactor',
  DEPLOY = 'deploy',
  INFRA = 'infra'
} 

export enum IStatus {
  BACKLOG = 'Backlog',
  TO_DO = 'To do',
  DOING = 'Doing',
  IN_REVIEW = 'In Review',
  DONE = 'Done'
} 

export interface IColumn {
  id: IStatus | string,
  title: string,
  cardsIds?: string[]
}

export interface ICard {
  id: string,
  title: string,
  category: ICategory,
  description: string,
  status: IStatus,
  hidden: boolean;
  data?: {
    [x: string]: any;
  };
}