import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
//menu
import { queryKeys } from '@lead/config/queryKeys';
import { buildListSchema, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { leadGetListQuery } from '@lead/services/graphql';
import { configFields } from '@lead/config/list-field/columns';

export const useGetLeads = (pageDataKey: string, fields: any[]) => {
  const { filterQuery, sort, paging, keyword } = useListPageSettings(pageDataKey);

  //build filter
  let filtersQuery: FilterInput = {
    keyword,
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery;

  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }

  let queryString = leadGetListQuery([listQuerySchema,RESTORE_SCHEMA].join('\n'));

  //get params
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKey = fields?.map((_ele: any) => _ele.keyName).join(',');

  const usePostResult = usePosts<any[]>([queryKeys.leadsGet, keyStringify(filtersQuery, ''), fieldQueryKey], queryString, params, {
    enabled: fields?.length > 0
  });

  return usePostResult;
};
