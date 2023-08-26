import usePosts from '@base/hooks/usePosts';
import { SETTING_SELECTION_FIELD_GET } from '@settings/general/services/graphql';
import { Selection } from '@settings/general/types/interface';
import { queryKeys } from '@settings/general/config/queryKeys';

export const useSelectionFields = (params: any, options?: any) => {
  const usePostResult = usePosts<Selection[]>(
    [queryKeys.settingSelectionFieldsGet, params.filter.query], //query keys
    SETTING_SELECTION_FIELD_GET,
    params,
    options
  );

  return usePostResult;
};
