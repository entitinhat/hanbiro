import usePost from '@base/hooks/usePost';
import { IdName } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { ModuleProcess, ModuleType } from '@process/types/process';
import { queryKeys } from '@process/config/queryKeys';
import { GET_MODULE_PROCESS, MODULE_PROCESSES } from '@process/services/process';
import { LIST_STALE_TIME } from '@base/config/constant';

export const useGetModuleProcesses = ({ module }: { module: ModuleType }) => {
  const queryKey = [queryKeys.getModuleProcesses, module];
  const response = usePost<BaseResponse<IdName[]>>(
    queryKey,
    MODULE_PROCESSES,
    {
      module: module
    },
    {
      staleTime: LIST_STALE_TIME,
      enabled: !!module
    }
  );
  return response;
};

export const useGetModuleProcess = (menu: string, docId: string, processId?: string) => {
  const queryKey = [queryKeys.getModuleProcess, menu, docId];
  const response = usePost<ModuleProcess>(
    queryKey,
    GET_MODULE_PROCESS,
    {
      source: {
        menu: menu,
        id: docId
      },
      processId: processId
    },
    {
      cacheTime: 0,
      enabled: !!processId
    }
  );
  return response;
};
