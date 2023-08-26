import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { MENU_QUOTE, MENU_SALES } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { buildListSchema, getListQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

//menu
import { queryKeys } from '@quote/config/queryKeys';
import { default as configFields } from '@quote/config/view-field';
import { Quote } from '@quote/types/interfaces';
import * as keyNames from '@quote/config/keyNames';
import { QUOTE_QUICKLIST_GET } from '@quote/services/graphql';
//import { isDeleteList } from '@quote/pages/ListPage/Helper';

export function getFilterParam(page: number) {
  const pageDataKey = `${MENU_SALES}_${MENU_QUOTE}`;
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
export function useQuotes(category: string, fields: any[]) {
  //get filter
  const pageDataKey = `${MENU_SALES}_${category}`;
  const { paging } = useListPageSettings(pageDataKey);

  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    //console.log('fields', fields);
    const hiddenFields = [keyNames.KEY_NAME_QUOTE_SUMMARY];
    const listFields = fields.filter((_ele: any) => !hiddenFields.includes(_ele.keyName));
    //console.log('listFields', listFields);
    listQuerySchema = buildListSchema({ fields: listFields, configFields });
    listQuerySchema = listQuerySchema + '\ncreatedBy {id name}'; //default schema
  }
  const queryString = getListQuery(queryKeys.listQuote, [listQuerySchema, RESTORE_SCHEMA].join('\n'));

  //get params
  const filtersQuery = getFilterParam(paging.page);
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKeys = fields.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.listQuote, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const postResult = usePosts<Quote[]>(queryKey, queryString, params, {
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
      const queryKey = [queryKeys.listQuote, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(queryKeys.listQuote, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
}

//quote by opportunity
export function useOpportunityQuotes(opportunityId: string) {
  const queryKey = [queryKeys.listQuote, opportunityId];
  const params = {
    filter: {
      //query: `opportunities=${opportunityId}`,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 20 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, QUOTE_QUICKLIST_GET, params, {
    keepPreviousData: true
    //enabled: opportunityId?.length > 0
  });

  return postResult;
}

export function useAutoCompleteQuotes(keyword?: string) {
  const queryKey = [queryKeys.listQuote, 'autocomplete', keyword];
  const params = {
    filter: {
      //query: `name=${keyword}`,
      keyword,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 20 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, QUOTE_QUICKLIST_GET, params, {
    keepPreviousData: true
  });

  return postResult;
}
