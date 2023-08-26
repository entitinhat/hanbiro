import { includes } from 'lodash';
import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { MENU_CUSTOMER } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { buildListSchema, getListQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { isDeleteList } from '@marketing-list/pages/ListPage/Helper';

//menu
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { default as configFields } from '@marketing-list/config/view-field';
import { CUSTOMER_CATEGORY_ENUM, CUSTOMER_CATEGORY_MARKETING_LIST } from '@marketing-list/config/constants';

export function getFilterParam(category: string, page: number) {
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
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
  //   if (category === CUSTOMER_CATEGORY_ALL) {
  //     //strQuery = `{category=${CUSTOMER_CATEGORY_ACCOUNT_NUM} category=${CUSTOMER_CATEGORY_CONTACT_NUM}}`;
  //     if (groupByDelete) {
  //       strQuery = ''; //get deleted customer list
  //     } else {
  //       strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]},${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]}`;
  //     }
  //   }

  strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_MARKETING_LIST]}`;

  strQuery += ' ' + filterQuery;
  filtersQuery.query = strQuery.trim();

  return filtersQuery;
}

export function useMarketingLists(category: string, viewFields: any[]) {
  //get filter
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { paging, filterValues } = useListPageSettings(pageDataKey);
  //console.log('filterQuery', filterQuery);

  //build schema
  let fields = [...viewFields];
  if (!isDeleteList(filterValues.groupBy)) {
    fields = viewFields.filter((v: any) => v.keyName !== 'deletedBy' && v.keyName !== 'deletedAt');
  }
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    listQuerySchema = buildListSchema({ fields, configFields });
  }
  console.log('listQuerySchema: ', listQuerySchema);
  //add category field
  //   listQuerySchema = listQuerySchema + '\ncategory \nupdatedAt \nassignTo { id name }'; //default schema
  const queryString = getListQuery(marketingQueryKeys.marketingListsGet, [listQuerySchema].join('\n'));

  //get params
  const filtersQuery = getFilterParam(category, paging.page);
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKeys = fields.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [marketingQueryKeys.marketingListsGet, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const postResult = usePosts<any[]>(queryKey, queryString, params, {
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
      const queryKey = [marketingQueryKeys.marketingListsGet, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(marketingQueryKeys.marketingListsGet, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
}
