import { gql } from 'graphql-request';

export const getListQuery = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      desk_knowledgebases(filter: $filter) {
        results {
          ${schemas}
        }
        paging {
          totalPage
          totalItems
          currentPage
          itemPerPage
        }
      }
    }
  `;
};

export const getViewQuery = (schemas: string) => {
  return gql`
    query q($id: String) {
      desk_knowledgebase(id: $id) {
        ${schemas}
      }
    }
  `;
};

export const CREATE_KNOWELEDGEBASE = gql`
  mutation q($knowledgebase: KnowledgeBase) {
    desk_createKnowledgebase(knowledgebase: $knowledgebase) {
      id
    }
  }
`;

export const UPDATE_KNOWELEDGEBASE = gql`
  mutation q($knowledgebase: KnowledgeBase) {
    desk_updateKnowledgebase(knowledgebase: $knowledgebase) {
      id
    }
  }
`;

export const DELETE_KNOWELEDGEBASE = gql`
  mutation q($ids: [String]) {
    desk_deleteKnowledgebase(ids: $ids) {
      ids
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query q($filter: FilterInput) {
    desk_tags(filter: $filter) {
      results {
        id
        name
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

// ================== KNOWLEDGE CATEGORIES =============================

export const KNOWLEDGE_CATEGORIES_GET = gql`
  query q($filter: FilterInput) {
    desk_kbCategories(filter: $filter) {
      results {
        id
        name
        description
        display
        type
        order
        hasChild
        parent {
          id
          name
        }
        category {
          id
          name
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const KNOWLEDGE_CATEGORY_CREATE = gql`
  mutation q($category: KnowledgeBaseCategory) {
    desk_createKBCategory(category: $category) {
      id
    }
  }
`;
export const KNOWLEDGE_CATEGORY_UPDATE = gql`
  mutation q($category: KnowledgeBaseCategory) {
    desk_updateKBCategory(category: $category) {
      id
    }
  }
`;

export const KNOWLEDGE_CATEGORY_DELETE = gql`
  mutation q($ids: [String]) {
    desk_deleteKBCategory(ids: $ids) {
      ids
    }
  }
`;

export const KNOWLEDGE_CATEGORIES_SORT = gql`
  mutation q($ids: [String]) {
    desk_sortKBCategory(ids: $ids) {
      ids
    }
  }
`;

export const KNOWLEDGE_CATEGORY_CHANGE = gql`
  mutation q($ids: [String], $category: String, $folder: String) {
    desk_moveKB(ids: $ids, category: $category, folder: $folder) {
      ids
    }
  }
`;

// ================== FOLDER =============================

export const KNOWLEDGE_FOLDERS_GET = gql`
  query q($filter: FilterInput) {
    desk_kbFolders(filter: $filter) {
      results {
        id
        name
        description
        display
        parent {
          id
          name
        }
        category {
          id
          name
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const KNOWLEDGE_FOLDER_CREATE = gql`
  mutation q($folder: KnowledgeBaseFolder) {
    desk_createKBFolder(folder: $folder) {
      id
    }
  }
`;

export const KNOWLEDGE_FOLDER_UPDATE = gql`
  mutation q($folder: KnowledgeBaseFolder) {
    desk_updateKBFolder(folder: $folder) {
      id
    }
  }
`;

export const KNOWLEDGE_FOLDER_DELETE = gql`
  mutation q($ids: [String]) {
    desk_deleteKBFolder(ids: $ids) {
      ids
    }
  }
`;

export const KNOWLEDGE_FOLDER_SORT = gql`
  mutation q($ids: [String]) {
    desk_sortKBFolder(ids: $ids) {
      ids
    }
  }
`;

export const KNOWLEDGE_AUTO_COMPLETE = gql`
  query q($filter: SearchFilter) {
    desk_knowledgebases(filter: $filter) {
      results {
        id
        subject
        content
        tags {
          id
          name
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;
export const CHANGE_KB_PUBLISH_STATUS = gql`
  mutation q($ids: [String], $isPublish: bool) {
    desk_changeKBPublishStatus(ids: $ids, isPublish: $isPublish) {
      ids
    }
  }
`;
export const CHANGE_KB_HELPFUL_STATUS = gql`
  mutation q($ids: [String], $helpful: bool) {
    desk_changeKBHelpfulStatus(ids: $ids, helpful: $helpful) {
      ids
    }
  }
`;
export const CLONE_KB = gql`
  mutation q($id: String) {
    desk_cloneKB(id: $id) {
      id
    }
  }
`;

export const CREATE_KNOWELEDGEBASE_INSERTED = gql`
  mutation q($id: string, $menu: string, $refId: IdName, $knowledge: IdName) {
    desk_createKBInserted(id: $id, menu: $menu, refId: $refId, knowledge: $knowledge) {
      id
    }
  }
`;

export const DELETE_KNOWELEDGEBASE_INSERTED = gql`
  mutation q($ids: [String]) {
    desk_deleteKBInserted(ids: $ids) {
      ids
    }
  }
`;

export const GET_ALL_KNOWELEDGEBASE_INSERTED = gql`
  query q($filter: SearchFilter) {
    desk_kbInserteds(filter: $filter) {
      results {
        id
        knowledge {
          id
          subject
          tags {
            id
            name
          }
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const KNOWLEDGE_DETAIL_MODAL = gql`
  query q($id: string) {
    desk_knowledgebase(id: $id) {
      id
      subject
      content
    }
  }
`;

export const KB_QUICK_VIEW_SCHEMA = `
  id
  subject
  content
  createdAt
  createdBy {
    id
    name
  }
`;

export const DESK_KB_RESTORE = gql`
  mutation m($ids: [String!]) {
    desk_restoreKB(ids: $ids) {
      ids
    }
  }
`;

export const DESK_KB_DELETE_RECOVERY = gql`
  mutation m($ids: [String!]) {
    desk_deleteKBRecovery(ids: $ids) {
      ids
    }
  }
`;

export const DESK_KB_EMPTY_RECOVERY = gql`
  mutation m($ids: [String!]) {
    desk_emptyKBRecovery {
      success
    }
  }
`;

//==============KB Comments=========

export const DESK_KB_COMMENT_LIST = gql`
  query {
    desk_kbComments(filter: $filter) {
      results {
        id
        content
        parent {
          id
          name
        }
        kb {
          id
          subject
        }
        attachedFiles {
          id
          name
          objectId
          objectUrl
        }
        createdAt
        createdBy {
          id
          name
          fullName
        }
      }
    }
  }
`;
export const DESK_KB_COMMENT_CREATE = gql`
  mutation {
    desk_createKBComment(comment: $comment) {
      id
    }
  }
`;
export const DESK_KB_COMMENT_DELETE = gql`
  mutation {
    desk_deleteKBComment(ids: $ids) {
      ids
    }
  }
`;
