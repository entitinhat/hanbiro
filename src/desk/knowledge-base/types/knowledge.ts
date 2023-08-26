import { IdName } from '@base/types/common';
import { User } from '@base/types/user';

export enum KnowlegeBaseType {
  NONE = 'TYPE_NONE',
  ARTICLE = 'TYPE_ARTICLE',
  CANNED_RESPONSE = 'TYPE_CANNED_RESPONSE'
}
export enum DisplayType {
  PUBLIC = 'DISPLAY_PUBLIC',
  PRIVATE = 'DISPLAY_PRIVATE'
}

export enum CategoryParentType {
  FOLDER = 'TYPE_FOLDER',
  CATEGORY = 'TYPE_CATEGORY'
}

export interface KnowledgeBaseCategory {
  id: string;
  name: string;
  type?: CategoryParentType;
  owner?: User;
  display?: DisplayType;
  knowledges?: number;
  hasChild?: boolean;
  parent?: KnowledgeBaseCategory | null;
  category?: KnowledgeBaseCategory;
  children?: KnowledgeBaseCategory[];
  description?: string;
  createdAt?: any;
  createdBy?: User;
  updatedAt?: any;
  updatedBy?: User;
}

export interface IdsCategoryFolder {
  ids: string[];
  category?: { id?: string; name?: string };
  folder?: { id?: string; name?: string };
}

export interface KnowledgeBaseFolder {
  id: string;
  name: string;
  categroy?: KnowledgeBaseCategory;
  folders?: KnowledgeBaseFolder[];
  knowledges?: number;
  active?: boolean;
  display?: string; // COMMENT '1 - Public, 2 - Private',
  description?: string;
  createdAt?: any;
  createdBy?: User;
  updatedAt?: any;
  updatedBy?: User;
  owner?: User;
}

export interface Template {
  id: string;
  name: string;
}
export interface KnowledgeBase {
  id: string;
  subject: string;
  //type?: EKnowlegeBaseType;
  tpl?: Template;
  isPublish?: boolean;
  category?: KnowledgeBaseCategory;
  folder?: KnowledgeBaseCategory;
  tags?: IdName[];
  //display?: EDisplay;
  active?: boolean;
  content?: string;
  viewed?: number;
  helped?: number;
  notHelped?: number;
  inserted?: number;
  createdAt?: any;
  createdBy?: User;
  updatedAt?: any;
  updatedBy?: User;
  isRead?: Boolean;
}

export interface KBInserted {
  id: string;
  knowledge: KnowledgeBase;
}

export interface KBComment {
  id: string;
  kb: IdName;
  content: string;
  parent?: any;
  attachedFiles: any;
  createdAt?: any;
  createdBy?: User;
}
