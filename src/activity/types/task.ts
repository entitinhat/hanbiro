import { AssignToName } from '@base/types/user';
import { Duration } from '@base/types/common';

export interface TaskChecklist {
  id: string;
  title: string;
  description: string;
  duration: Duration;
  instruction: string;
  doneTime?: string;
  done?: boolean;
  workers: AssignToName[];
  newFlag?: boolean;
  editFlag?: boolean;
}

export interface TaskSequence extends TaskChecklist {
  // seq?: number;
}

export interface TaskChecklistRequest {
  id: string;
  checklist: TaskChecklist;
}

export interface TaskChecklistDeleteRequest {
  id: string;
  refId: string;
}

export interface TaskSequenceRequest {
  id: string;
  sequence: TaskSequence;
}

export interface TaskSequenceDeleteRequest {
  id: string;
  refId: string;
}