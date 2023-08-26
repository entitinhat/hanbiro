import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { keyStringify } from '@base/utils/helpers';
import { SiteGroup, SiteTemplate } from '@settings/site/types/site';
import { siteQueryKeys } from '../config/queryKeys';

import { GET_ALL_SITES, GET_PREVIEW_SITE_TEMPLATE, GET_SITE_DETAIL } from './graphql';

export const useSites = (filter: FilterInput, enabled?: boolean) => {
  let queryKey = [siteQueryKeys.sitesGet, keyStringify(filter, '')];
  let params = {
    filter
  };
  const response = usePosts<SiteTemplate[]>(queryKey, GET_ALL_SITES, params, {
    enabled: enabled ?? true
  });
  return response;
};

export const useSite = (id: String | undefined, siteGroup: SiteGroup) => {
  let queryKey = [siteQueryKeys.siteGet, siteGroup, id];
  let params = {
    id
  };
  const response = usePost<SiteTemplate>(queryKey, GET_SITE_DETAIL, params, {
    enabled: !!id
  });
  return response;
};

export const usePreviewSite = (previewJsonData: String, siteGroup: String) => {
  let queryKey = [siteQueryKeys.siteReview, siteGroup, previewJsonData];
  let params = {
    jsonData: previewJsonData,
    siteGroup
  };
  const response = usePost<SiteTemplate>(queryKey, GET_PREVIEW_SITE_TEMPLATE, params, {
    enabled: previewJsonData != ''
  });
  return response;
};
