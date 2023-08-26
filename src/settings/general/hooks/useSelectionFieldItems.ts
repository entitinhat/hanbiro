import usePosts from '@base/hooks/usePosts';
import { FieldOption } from '@settings/general/types/interface';
import { queryKeys } from '@settings/general/config/queryKeys';
import { GET_SELECTION_FIELD_ITEMS_BY_SINGLE_KEY } from '@base/services/graphql/setting';

export const useSelectionFieldItems = (params: any, options?: any) => {
  let arrQueryKeys: any = [queryKeys.settingSelectionFieldItemsGet];
  if (params?.keyName) {
    arrQueryKeys.push(params.keyName);
  }
  if (params?.keyNames) {
    arrQueryKeys.push(params.keyNames.join(','));
  }

  const usePostResult = usePosts<FieldOption[]>(
    arrQueryKeys, //query keys
    GET_SELECTION_FIELD_ITEMS_BY_SINGLE_KEY,
    params,
    options
  );

  return usePostResult;
};
