import { S3UploadedFile } from '@base/types/s3';

import { BaseTask, BaseTaskGroup, FinishingQA, Link } from './task';

export interface TaskGroupTemplate extends BaseTaskGroup {}

export interface TaskTemplate extends BaseTask {
  attachments?: S3UploadedFile[];
  links?: Link[];
  qa?: FinishingQA[];
}

export interface TaskTemplateOpen {
  open: boolean;
  id?: string;
}

export interface TaskGroupTemplateOpen {
  open: boolean;
  data?: TaskGroupTemplate;
}
