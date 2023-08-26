//third-party

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { buildListSchema, getListQuery, keyStringify } from '@base/utils/helpers/schema';

//menu
import { default as configFields } from '@settings/digital/ticket-form/config/view-field';
import { queryKeys } from '@settings/digital/ticket-form/config/queryKeys';
import useInfinitePosts from '@base/hooks/useInfinitePosts';

export const useTicketForms = (pageDataKey: string, fields: any[]) => {
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);
  //console.log('filterQuery', filterQuery);

  //build filter
  let filtersQuery: FilterInput = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery;

  //build schema
  let listQuerySchema = '';

  // console.log('fields: ', fields);
  // console.log('configFields: ', configFields);
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }
  // console.log('listQuerySchema: ', listQuerySchema);

  //add category field
  const queryString = getListQuery(queryKeys.ticketFormsGet, listQuerySchema);

  //get params
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKey = fields.map((_ele: any) => _ele.keyName).join(',');

  const usePostResult = usePosts<any[]>([queryKeys.ticketFormsGet, keyStringify(filtersQuery, ''), fieldQueryKey], queryString, params, {
    enabled: fields.length > 0
  });

  return usePostResult;
};

export const useTicketFormsInfinite = (pageDataKey: string, fields: any[], filterOptions?: any) => {
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);
  //console.log('filterQuery', filterQuery);

  //build filter
  let filtersQuery: FilterInput = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery;
  if (filterOptions) filtersQuery = { ...filtersQuery, ...filterOptions };

  //build schema
  let listQuerySchema = '';

  // console.log('fields: ', fields);
  // console.log('configFields: ', configFields);
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }
  // console.log('listQuerySchema: ', listQuerySchema);

  //add category field
  const queryString = getListQuery(queryKeys.ticketFormsGet, listQuerySchema);

  //get params
  let params = {
    filter: filtersQuery
  };
  //query fields key
  const fieldQueryKey = fields.map((_ele: any) => _ele.keyName).join(',');

  const usePostResult = useInfinitePosts<any[]>(
    [queryKeys.ticketFormsGet, JSON.stringify(keyStringify(filtersQuery, '')), fieldQueryKey],
    queryString,
    params,
    {
      enabled: fields.length > 0
    }
  );

  return usePostResult;
};
