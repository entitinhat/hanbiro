import { User } from '@base/types/user';
import { IdName } from '@base/types/common';
import { FinishingQA } from './task';

export interface Planning {
  id: string;
  projectId: string;
  name: string;
  description: string;
  pageType: IdName;
  link: string;
  uiImage: string;
  instruction: string;
  sequence: string;
  qa: FinishingQA[];
  createdAt: Date;
  createdBy?: User;
}
