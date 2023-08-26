//third-party

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

//menu
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys';
import { buildListSchema, generateFilterQuery, keyStringify, getListQuery } from '@base/utils/helpers/schema';
// import { getListQuery } from '@settings/digital/landing-page/services/graphql';
import { default as configFields } from '@settings/digital/landing-page/config/view-field';
import useInfinitePosts from '@base/hooks/useInfinitePosts';

export const useLandingPages = (pageDataKey: string, fields: any[], opts: any = {}) => {
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

  //add category field
  const queryString = getListQuery(landingPageQueryKeys.landingPagesGet, listQuerySchema);

  //get params
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKey = fields.map((_ele: any) => _ele.keyName).join(',');

  const usePostResult = usePosts<any[]>(
    [landingPageQueryKeys.landingPagesGet, keyStringify(filtersQuery, ''), fieldQueryKey],
    queryString,
    params,
    {
      enabled: fields.length > 0,
      ...opts
    }
  );

  return usePostResult;
};

export const useLandingPagesInfinite = (pageDataKey: string, fields: any[], opts: any = {}, filterOptions?: any) => {
  const { filterQuery, sort, paging, keyword } = useListPageSettings(pageDataKey);

  //build filter
  let filtersQuery: FilterInput = {
    keyword,
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery;
  if (filterOptions) filtersQuery = { ...filtersQuery, ...filterOptions };
  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }

  //add category field
  const queryString = getListQuery(landingPageQueryKeys.landingPagesGet, listQuerySchema);

  //get params
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKey = fields.map((_ele: any) => _ele.keyName).join(',');

  const usePostResult = useInfinitePosts<any[]>(
    [landingPageQueryKeys.landingPagesGet, JSON.stringify(keyStringify(filtersQuery, '')), fieldQueryKey],
    queryString,
    params,
    {
      enabled: fields.length > 0,
      ...opts
    }
  );

  return usePostResult;
};
