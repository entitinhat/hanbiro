import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { MENU_CAMPAIGN } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { buildListSchema, getListQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

//menu
import { queryKeys } from '@campaign/config/queryKeys';
import { Campaign } from '@campaign/types/interface';
import { default as configFields } from '@campaign/config/view-field';
import {
  CAMPAIGN_CATEGORY_ALL,
  CAMPAIGN_CATEGORY_EMAIL,
  CAMPAIGN_CATEGORY_SMS,
  CAMPAIGN_CATEGOTY_ENUM_EMAIL,
  CAMPAIGN_CATEGOTY_ENUM_SMS
} from '@campaign/config/constants';
import { isDeleteList } from '@campaign/pages/ListPage/Helper';

export function getFilterParam(category: string, page: number) {
  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;
  const { filterQuery, sort, paging, filterValues } = useListPageSettings(pageDataKey);

  const groupByDelete = isDeleteList(filterValues?.groupBy);

  //build filter
  let filtersQuery: FilterInput = {
    sort,
    paging: {
      ...paging,
      page: page ? page : paging.page
    }
  };
  //build query
  let strQuery = '';
  if (category === CAMPAIGN_CATEGORY_ALL) {
    //strQuery = `{category=${CUSTOMER_CATEGORY_ACCOUNT_NUM} category=${CUSTOMER_CATEGORY_CONTACT_NUM}}`;
    if (groupByDelete) {
      strQuery = ''; //get deleted customer list
    } else {
      strQuery = `category=${CAMPAIGN_CATEGOTY_ENUM_EMAIL},${CAMPAIGN_CATEGOTY_ENUM_SMS}`;
    }
  }
  if (category === CAMPAIGN_CATEGORY_EMAIL) {
    strQuery = `category=${CAMPAIGN_CATEGOTY_ENUM_EMAIL}`;
  }
  if (category === CAMPAIGN_CATEGORY_SMS) {
    strQuery = `category=${CAMPAIGN_CATEGOTY_ENUM_SMS}`;
  }
  strQuery += ' ' + filterQuery;
  filtersQuery.query = strQuery.trim();

  return filtersQuery;
}

export function useCampaigns(category: string, fields: any[]) {
  //get filter
  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;
  const { paging } = useListPageSettings(pageDataKey);

  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }
  //add category field
  listQuerySchema = listQuerySchema + '\ncategory \nupdatedAt'; //default schema
  const queryString = getListQuery(queryKeys.campaignListGet, [listQuerySchema, RESTORE_SCHEMA].join('\n'));

  //get params
  const filtersQuery = getFilterParam(category, paging.page);
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKeys = fields.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.campaignListGet, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const postResult = usePosts<Campaign[]>(queryKey, queryString, params, {
    keepPreviousData: true,
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
      const queryKey = [queryKeys.campaignListGet, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(queryKeys.campaignListGet, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
}
