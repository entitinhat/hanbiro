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

//menu
import { isDeleteList } from '@customer/pages/ListPage/Helper';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { Customer } from '@customer/types/interface';
import { default as configFields } from '@customer/config/view-field';
import {
  CUSTOMER_CATEGORY_ACCOUNT,
  CUSTOMER_CATEGORY_ALL,
  CUSTOMER_CATEGORY_CONTACT,
  CUSTOMER_CATEGORY_ENUM,
  CUSTOMER_CATEGORY_MARKETING_LIST
} from '@customer/config/constants';
import { CUSTOMER_MARKETING_LIST } from '@customer/services/graphql';
import * as keyNames from '@customer/config/keyNames';

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
  if (category === CUSTOMER_CATEGORY_ALL) {
    //strQuery = `{category=${CUSTOMER_CATEGORY_ACCOUNT_NUM} category=${CUSTOMER_CATEGORY_CONTACT_NUM}}`;
    if (groupByDelete) {
      strQuery = ''; //get deleted customer list
    } else {
      strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]},${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]}`;
    }
  }
  if (category === CUSTOMER_CATEGORY_ACCOUNT) {
    //strQuery = `category=${CUSTOMER_CATEGORY_ACCOUNT_NUM}`;
    strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]}`;
  }
  if (category === CUSTOMER_CATEGORY_CONTACT) {
    //strQuery = `category=${CUSTOMER_CATEGORY_CONTACT_NUM}`;
    strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]}`;
  }

  strQuery += ' ' + filterQuery;
  filtersQuery.query = strQuery.trim();

  return filtersQuery;
}

export function useCustomers(category: string, fields: any[]) {
  //get filter
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { paging } = useListPageSettings(pageDataKey);
  //console.log('filterQuery', filterQuery);

  //build schema
  let listQuerySchema = '';
  if (fields && fields.length > 0) {
    const ignoreFields = [keyNames.KEY_NAME_CUSTOMER_DELETED_AT, keyNames.KEY_NAME_CUSTOMER_DELETED_BY];
    listQuerySchema = buildListSchema({ fields, configFields, ignore: ignoreFields });
  }
  listQuerySchema = [listQuerySchema, 'isRead'].join('\n');
  //add category field
  listQuerySchema = [listQuerySchema, 'code', 'category', 'createdAt'].join('\n'); //listQuerySchema + '\ncode \ncategory \ncreatedAt'; //default schema
  if (category === CUSTOMER_CATEGORY_ALL) {
    //listQuerySchema = listQuerySchema + '\ncontactType \nmobiles {id label labelValue country mobileNumber}';
    listQuerySchema = [listQuerySchema, 'contactType', 'mobiles {id label labelValue country mobileNumber}'].join('\n');
  }
  const queryString = getListQuery(customerQueryKeys.customersGet, [listQuerySchema, RESTORE_SCHEMA].join('\n'));

  //get params
  const filtersQuery = getFilterParam(category, paging.page);
  let params = {
    filter: filtersQuery
  };

  //query fields key
  const fieldQueryKeys = fields.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [customerQueryKeys.customersGet, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const postResult = usePosts<Customer[]>(queryKey, queryString, params, {
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
      const queryKey = [customerQueryKeys.customersGet, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      queryClient.prefetchQuery(queryKey, () => graphQLGetsApi(customerQueryKeys.customersGet, queryString, nextParams));
    }
  }, [postResult.data, paging]);

  return postResult;
}

export function useQuickCustomers(category: string, paging: any, opt?: any) {
  const queryKey = [customerQueryKeys.customersGet, 'quicklist', category, paging.page];
  let strQuery = '';
  if (category === CUSTOMER_CATEGORY_ACCOUNT) {
    strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_ACCOUNT]}`;
  }
  if (category === CUSTOMER_CATEGORY_CONTACT) {
    strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]}`;
  }
  if (category === CUSTOMER_CATEGORY_MARKETING_LIST) {
    strQuery = `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_MARKETING_LIST]}`;
  }
  //build filter
  let filtersQuery: FilterInput = {
    paging,
    query: strQuery
  };

  const postResult = usePosts<Customer[]>(
    queryKey,
    CUSTOMER_MARKETING_LIST,
    { filter: filtersQuery },
    {
      keepPreviousData: true,
      ...opt
    }
  );

  return postResult;
}
