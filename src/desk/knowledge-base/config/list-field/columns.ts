import * as keyNames from '@desk/knowledge-base/config/keyNames';
import commonConfigs from '@base/config/list-field/columns';
import {
  allArticlesColumn,
  allDraftsColumn,
  allPublishedColumn,
  deletedColumn,
  myArticlesColumn,
  myDraftsColumn,
  myGroupArticlesColumn,
  myGroupDraftsColumn,
  myGroupPublishedColumn,
  myPublishedColumn
} from './kb-columns';

export const listLayoutColumns: { [index: string]: any[] } = {
  all: allArticlesColumn,
  my: myArticlesColumn,
  myGroup: myGroupArticlesColumn,
  allDrafts: allDraftsColumn,
  allPublished: allPublishedColumn,
  myDrafts: myDraftsColumn,
  myPublished: myPublishedColumn,
  myGroupDrafts: myGroupDraftsColumn,
  myGroupPublished: myGroupPublishedColumn,
  deletedKB: deletedColumn
};

export const configFields = {
  ...commonConfigs,
  [keyNames.KEY_KNOWLEDGE_BASE_CATEGORY]: {
    schema: `
    category {
      id
      name
    }
    folder {
      id
      name
      parent  {
        id
        name
      }
    }
    `
  },
  [keyNames.KEY_KNOWLEDGE_BASE_FOLDER]: {
    schema: `
    `
  },
  [keyNames.KEY_KNOWLEDGE_BASE_TAG]: {
    schema: `
    tags {
      id
      name
    }
    `
  },
  [keyNames.KEY_KNOWLEDGE_BASE_CONTENT]: {
    schema: `
    content
      tpl {
        id
        name
      }
    `
  }
};
