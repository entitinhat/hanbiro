//third-party

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { buildListSchema, getListQuery, keyStringify } from '@base/utils/helpers/schema';

//menu
import { default as configFields } from '@settings/digital/satisfaction/config/view-field';
import { queryKeys } from '@settings/digital/satisfaction/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { graphQLGetsApi } from '@base/utils/axios/graphql';

export const useSatisfactionSurveys = (fields: any[]) => {
  const pageDataKey = `setting_satisfaction_survey`;
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
  const queryString = getListQuery(queryKeys.satisfactionSurveysGet, listQuerySchema);

  //get params
  let params = {
    filter: filtersQuery
  };

  const postResult = usePosts<any[]>([queryKeys.satisfactionSurveysGet, keyStringify(filtersQuery, '')], queryString, params, {
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
      const queryKey = [queryKeys.satisfactionSurveysGet, keyStringify(nextFilterQuery, '')];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(queryKeys.satisfactionSurveysGet, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
};
