import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { buildListSchema, getListQuery, keyStringify } from '@base/utils/helpers/schema';
import { graphQLGetsApi } from '@base/utils/axios/graphql';

//menu
import { default as configFields } from '@settings/digital/survey/config/view-field';
import { queryKeys } from '@settings/digital/survey/config/queryKeys';

export const useSurveys = (fields: any[]) => {
  const pageDataKey = `setting_survey`;
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);
  //console.log('filterQuery', filterQuery);

  //build filter
  let filtersQuery: FilterInput = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery?.trim();

  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }
  //add category field
  const queryString = getListQuery(queryKeys.surveysGet, listQuerySchema);

  //get params
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKeys = fields.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.surveysGet, keyStringify(filtersQuery, ''), fieldQueryKeys];

  const postResult = usePosts<any[]>(queryKey, queryString, params, {
    //keepPreviousData: true,
    enabled: fields.length > 0
  });

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    const curPage = postResult.data?.paging?.currentPage || 1;
    const totalPage = postResult.data?.paging?.totalPage || 0;
    //console.log('postResult next', postResult.data?.paging);
    if (curPage < totalPage) {
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: curPage + 1
        }
      };
      const nextParams = {
        filter: nextFilterQuery
      };
      //console.log('nextParams next', nextParams);
      const queryKey = [queryKeys.surveysGet, keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(queryKeys.surveysGet, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
};
