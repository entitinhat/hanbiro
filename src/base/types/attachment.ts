import { FilterInput, SourceInput } from './common';

export interface Attachment {
  id?: string;
  source: SourceInput;
  name: string;
  orgName: string;
  size: number;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
export interface AttachmentsResponse {
  paging: any;
  results: Attachment[];
}

export interface AttachmentsInput {
  filter: FilterInput;
  source: SourceInput;
}
export interface DeleteAttachmentInput {
  id: string;
}
export interface AddAttachmentInput {
  attachment: Attachment;
}
