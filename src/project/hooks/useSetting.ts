import { queryKeys } from '@project/config/queryKeys';
import { SettingResponse } from '@project/types/setting';
import usePost from '@base/hooks/usePost';

export const useSetting = (schema: string, params?: any, opts?: any) => {
  const fallback = { results: [] } as SettingResponse;
  const { data: results = fallback, refetch } = usePost<SettingResponse>([queryKeys.getSettings], schema, params, opts);

  return { results, refetch };
};
