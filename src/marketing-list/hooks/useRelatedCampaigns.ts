import { includes } from 'lodash';
import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';

import { buildListSchema, getListQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

//menu
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { GET_RELATED_CAMPAIGN } from '@marketing-list/services/graphql';

export function getFilterParam() {
  //build filter
  let filtersQuery: FilterInput = {
    filters: {},
    keyword: '',
    sort: { field: 'createdAt', orderBy: 2 },
    paging: { page: 1, size: 20 }
  };

  return filtersQuery;
}

export function useRelatedCampaigns() {
  //get params
  const filtersQuery = getFilterParam();

  const params = {
    filter: { ...filtersQuery }
  };

  //query fields key
  const queryKey = [marketingQueryKeys.relatedCampaignGet, 'list', keyStringify(filtersQuery, '')];

  const postResult = usePosts<any[]>(queryKey, GET_RELATED_CAMPAIGN, params);

  return postResult;
}
