import { IdName } from '@base/types/common';

export interface Report {
  id: string;
  name: string;
  recipients: IdName[];
  subject: string;
  content: string;
  assignmentGroupType: string;
  assignmentGroups: IdName[];
  reportingCycle: {
    frequency: string;
    every: string;
    startTime: Date;
    endTime: Date;
  };
  dateRange: string;
  displayMode: string;
  displayGrid: boolean;
  pages: {
    id: string;
    name: string;
    sections: {
      section: string;
      charts: string[];
    }[];
  }[];
  createdAt: Date;
  createdBy: IdName;
  updatedAt: Date;
  updatedBy: IdName;
  active: boolean;
}

export interface DisplayModeProps {
  sections:any[];
  isDisplayGrid: boolean;
  isVirtualChart?: boolean;
}