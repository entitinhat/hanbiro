import { ASC } from '@base/config/constant';
import { queryKeys } from '@base/config/queryKeys';
import { ATTACHMENT_GET_LIST_BY_MENU } from '@base/services/graphql/attachment';
import { AttachmentsResponse } from '@base/types/attachment';
import { FilterInput, SourceInput } from '@base/types/common';
import usePost from '../usePost';

export const useAttachmentsByMenu = (menuSource: string, menuSourceId: string, size = 100, page = 1) => {
  let filter: FilterInput = {
    sort: {
      field: 'createdAt',
      orderBy: ASC
    },
    paging: {
      size: size,
      page: page
    }
  };
  let source: SourceInput = {
    menu: menuSource,
    id: menuSourceId
  };
  let params = {
    filter: filter,
    source: source
  };
  let keys = [queryKeys.attachments, menuSource, menuSourceId];
  const response = usePost<AttachmentsResponse>(keys, ATTACHMENT_GET_LIST_BY_MENU, params, {
    enabled: !!menuSourceId
  });
  return response;
};
