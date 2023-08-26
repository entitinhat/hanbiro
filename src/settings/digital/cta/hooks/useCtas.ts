//third-party

//project
import usePosts from '@base/hooks/usePosts';
import { buildListSchema, getListQuery, keyStringify } from '@base/utils/helpers/schema';

//menu
import { queryKeys } from '@settings/digital/cta/config/queryKeys';
import { SETTING_CTA_ALL_GET } from '../services/graphql';

export const useCtaList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: undefined };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<any[]>([queryKeys.ctasGet, keyStringify(params?.filter, '')], getListQuery(queryKeys.ctasGet, schema), params, opts);
  return { results, refetch, status };
};

export const useCtaAll = (params?: any, opts?: any) => {
  const {
    data: results,
    refetch,
    status
  } = usePosts<any>([queryKeys.ctasGet, keyStringify(params?.filter, '')], SETTING_CTA_ALL_GET, params, opts);
  return { results, refetch, status };
};
