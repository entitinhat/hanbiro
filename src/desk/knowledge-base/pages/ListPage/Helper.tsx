import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import ChipDraft from '@base/components/@hanbiro/ChipDraft';
import RouteName from '@base/components/@hanbiro/RouteName';
import ChipPublished from '@base/components/@hanbiro/ChipDraft/Published';

export const columnRenderRemap = (menu: string) => ({
  subject(col: string, row: KnowledgeBase) {
    const name = row.subject ?? '';
    const isRead = row.isRead ?? true;
    let url = `/mdesk/knowledge/${row.id}`;
    return <RouteName url={url} component="h6" name={name} isRead={isRead}></RouteName>;
  },
  category(col: string, row: KnowledgeBase) {
    const category = row?.category?.name ?? '';
    const folder = row?.folder?.name ?? '';
    const parentFolder = row?.folder?.parent?.name;
    const path = parentFolder ? `${category}/${parentFolder}/${folder}` : `${category}/${folder}`;
    return path ?? '';
  },
  inserted(col: string, row: KnowledgeBase) {
    return row.inserted ?? 0;
  },
  viewed(col: string, row: KnowledgeBase) {
    return row.viewed ?? 0;
  },
  helped(col: string, row: KnowledgeBase) {
    return row.helped ?? 0;
  },
  notHelped(col: string, row: KnowledgeBase) {
    return row.notHelped ?? 0;
  },
  isPublish(col: string, row: KnowledgeBase) {
    return row?.isPublish ? <ChipPublished /> : <ChipDraft />;
  }
});

export const getParseFilterQuery = (filterQuery?: string, categoryId?: string, folderParentId?: string, userId?: string) => {
  let query = filterQuery;
  if (categoryId && categoryId.length > 0) {
    query += ` category=\"${categoryId}\"`;
  }
  if (folderParentId && folderParentId.length) {
    query += ` folder=\"${folderParentId}\"`;
  }
  if (
    query?.includes('groupBy=myDraft') ||
    query?.includes('groupBy=myPublished') ||
    query?.includes('groupBy=myGroupDrafts') ||
    query?.includes('groupBy=myGroupPublished')
  ) {
    query += `createdBy=${userId}`;
  }

  return query;
};

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedKB'].indexOf(groupBy) >= 0;
};
