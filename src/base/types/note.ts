import { User } from './user';
import { FilterInput, SourceInput } from './common';

export interface NotesPayload {
  results: Note[];
  paging: {
    totalItems: number;
    totalPage: number;
    currentPage: number;
    itermPerPage?: number;
  };
}

export interface Note {
  id: string;
  source: string;
  sourceId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy: User;
  updatedBy?: User;
}

export interface NoteForm {
  id?: string;
  source: {
    menu: string;
    id: string;
  };
  content: string;
}

export interface NotesInput {
  filter: FilterInput;
  source: SourceInput;
}
