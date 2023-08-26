import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { buildListSchema, getListQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

//menu
import { queryKeys } from '@opportunity/config/queryKeys';
import { default as configFields } from '@opportunity/config/view-field';
import { Opportunity } from '@opportunity/types/interfaces';
import * as keyNames from '@opportunity/config/keyNames';
import { OPPORTUNITY_LISTS_GET } from '@opportunity/services/graphql';
//import { isDeleteList } from '@quote/pages/ListPage/Helper';

export function getFilterParam(page: number) {
  const pageDataKey = MENU_OPPORTUNITY_OPPORTUNITY;
  const { filterQuery, sort, paging, filterValues } = useListPageSettings(pageDataKey);

  const isDeletedGrouping = false; //isDeleteList(filterValues?.groupBy);

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
  // if (category === CAMPAIGN_CATEGORY_ALL) {
  //   //strQuery = `{category=${CUSTOMER_CATEGORY_ACCOUNT_NUM} category=${CUSTOMER_CATEGORY_CONTACT_NUM}}`;
  //   if (isDeletedGrouping) {
  //     strQuery = ''; //get deleted customer list
  //   } else {
  //     strQuery = `category=${CAMPAIGN_CATEGOTY_ENUM_EMAIL},${CAMPAIGN_CATEGOTY_ENUM_SMS}`;
  //   }
  // }
  // if (category === CAMPAIGN_CATEGORY_EMAIL) {
  //   strQuery = `category=${CAMPAIGN_CATEGOTY_ENUM_EMAIL}`;
  // }
  // if (category === CAMPAIGN_CATEGORY_SMS) {
  //   strQuery = `category=${CAMPAIGN_CATEGOTY_ENUM_SMS}`;
  // }
  strQuery += ' ' + filterQuery;
  filtersQuery.query = strQuery.trim();

  return filtersQuery;
}

//category = 'quote'
export function useOpportunities(fields: any[]) {
  //get filter
  const pageDataKey = MENU_OPPORTUNITY_OPPORTUNITY;
  const { paging } = useListPageSettings(pageDataKey);

  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    //console.log('fields', fields);
    //const hiddenFields = [keyNames.KEY_NAME_QUOTE_SUMMARY];
    //const listFields = fields.filter((_ele: any) => !hiddenFields.includes(_ele.keyName));
    //console.log('listFields', listFields);
    listQuerySchema = buildListSchema({ fields, configFields });
    listQuerySchema = listQuerySchema + '\nfCurrency {code currencySymbol}'; //default schema
  }
  const queryString = getListQuery(queryKeys.opportunityList, [listQuerySchema, RESTORE_SCHEMA].join('\n'));

  //get params
  const filtersQuery = getFilterParam(paging.page);
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKeys = fields.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.opportunityList, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const postResult = usePosts<Opportunity[]>(queryKey, queryString, params, {
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
      const queryKey = [queryKeys.opportunityList, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(queryKeys.opportunityList, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
}

export function useAutoCompleteOpportunities(keyword?: string) {
  const queryKey = [queryKeys.opportunityList, 'autocomplete', keyword];
  const params = {
    filter: {
      //query: `name=${keyword}`,
      keyword,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 20 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, OPPORTUNITY_LISTS_GET, params, {
    keepPreviousData: true
  });

  return postResult;
}
