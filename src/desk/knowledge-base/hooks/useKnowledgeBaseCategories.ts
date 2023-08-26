import usePosts from '@base/hooks/usePosts';
import { queryKeys } from '../config/queryKeys';
import { KNOWLEDGE_CATEGORIES_GET } from '../services/graphql';
import { KnowledgeBaseCategory } from '../types/knowledge';

export const useKnowledgeBaseCategories = ({ keyword, categoryId, folderParentId, paging }: any) => {
  //console.log('~~~~~~ keyword', keyword, ' categoryId', categoryId);
  let query = '';
  let filter = {};
  if (keyword) {
    query += `name:\"${keyword}\"`;
  } else {
    if (categoryId) {
      query += ` category=\"${categoryId}\"`;
    }
    if (folderParentId) {
      query += ` parent=\"${folderParentId}\"`;
    }
  }

  let queryKey = [queryKeys.kbCategories, keyword, categoryId, folderParentId];

  if (paging) {
    filter = { query, paging };
    queryKey = [queryKeys.kbCategories, keyword, categoryId, folderParentId, paging];
  } else {
    filter = { query };
  }

  const response = usePosts<KnowledgeBaseCategory[]>(queryKey, KNOWLEDGE_CATEGORIES_GET, {
    filter: filter
  });
  return response;
};

export const useKnowledgeBaseFolders = ({ keyword, categoryId, folderParentId, paging }: any) => {
  //console.log('~~~~~~ keyword', keyword, ' categoryId', categoryId);
  let query = '';
  let filter = {};
  if (keyword) {
    query += `name:\"${keyword}\"`;
  }
  if (categoryId) {
    query += ` category=\"${categoryId}\"`;
  }
  if (folderParentId) {
    query += ` parent=\"${folderParentId}\"`;
  }

  let queryKey = [queryKeys.kbCategories, keyword, categoryId, folderParentId];

  if (paging) {
    filter = { query, paging };
    queryKey = [queryKeys.kbCategories, keyword, categoryId, folderParentId, paging];
  } else {
    filter = { query };
  }

  const response = usePosts<KnowledgeBaseCategory[]>(queryKey, KNOWLEDGE_CATEGORIES_GET, {
    filter: filter
  });
  return response;
};
