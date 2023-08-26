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
import { useParams } from 'react-router-dom';
import { GET_MEMBERS } from '@marketing-list/services/graphql';

export function getFilterParam(categoryId: string, paging: any) {
  //build filter
  let filtersQuery: FilterInput = {
    filters: {},
    keyword: '',
    sort: { field: 'createdAt', orderBy: 2 },
    paging: { page: paging.page, size: paging.size },
    query: `marketingListId=${categoryId}`
  };

  return filtersQuery;
}

export function useMembers(paging: any, opts: any) {
  const { id: categoryId } = useParams();
  //console.log('filterQuery', filterQuery);

  //get params
  const filtersQuery = getFilterParam(categoryId || '', paging);

  const params = {
    filter: { ...filtersQuery }
  };

  //query fields key
  const queryKey = [marketingQueryKeys.membersGet, 'list', keyStringify(filtersQuery, '')];

  const postResult = usePosts<any[]>(queryKey, GET_MEMBERS, params, opts);

  return postResult;
}
