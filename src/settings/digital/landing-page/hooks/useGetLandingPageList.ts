import usePosts from '@base/hooks/usePosts';
import { LANDINGPAGE_GET_LIST } from '@settings/digital/landing-page/services/graphql';
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys';
import { FilterInput } from '@base/types/common';
import { keyStringify } from '@base/utils/helpers';

export const useGetLangdingPageList = (filter?: FilterInput) => {
  let params: any = {
    filter: {
      filters: {},
      keyword: '',
      paging: {
        page: 1,
        size: 999
      },
      ...filter
    }
  };
  const response: any = usePosts<any[]>(
    [landingPageQueryKeys.landingPagesGet, keyStringify(params.filter, '')],
    LANDINGPAGE_GET_LIST,
    params
  );
  return response;
};
