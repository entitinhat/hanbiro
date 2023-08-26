import { defaultPaging } from '@base/config/constant';
import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { BaseResponse } from '@base/types/response';
import { keyStringify } from '@base/utils/helpers';
import { BusinessProcess } from '@process//types/process';
import { queryKeys } from '@process/config/queryKeys';
import { GET_DEFINED_FIELDS } from '@process/services/custom';
import { GET_BUSINESS_PROCESS, GET_PROCESS_STEPS } from '@process/services/process';
import { BusinessStep, DefinedField } from '@process/types/process';

export const useProcessList = (schema: string, params: any, opts?: any) => {
  // If the results is null, It has to define fallback as default.
  const fallback = { data: [], paging: defaultPaging };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<BusinessProcess[]>([queryKeys.listProcess, keyStringify(params?.filter, '')], schema, params, opts);

  // get next data in advance.
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   if (results.paging && results.paging?.currentPage < results.paging?.totalPage) {
  //     const nextPage = results.paging?.currentPage + 1;
  //     const filter = { ...params?.filter, paging: { ...params?.filter.paging, page: nextPage } };
  //     queryClient.prefetchQuery<DatasPromise<BusinessProcess[]>>([queryKeys.listProcess, keyStringify(filter, '')], () =>
  //       graphQLGetsApi<BusinessProcess[]>(queryKeys.listProcess, schema, { ...params, filter: filter })
  //     );
  //   }
  // }, [results.paging, params, queryClient]);

  return { results, refetch, status };
};

export const useGetProcess = (processId: string) => {
  const fallback = {} as BusinessProcess;
  const queryKey = [queryKeys.getProcess, processId];
  const { data: result = fallback } = usePost<BusinessProcess>(queryKey, GET_BUSINESS_PROCESS, {
    id: processId
  });
  return result;
};

export const useDefinedFields = (module?: string) => {
  const queryKey = [queryKeys.definedFields];
  const response = usePost<BaseResponse<DefinedField[]>>(
    queryKey,
    GET_DEFINED_FIELDS,
    {
      isTenant: false,
      module: module
    },
    {
      cacheTime: 1000 * 5
    }
  );
  return response;
};

export const useGetProcessSteps = (processId?: string, query?: string) => {
  const queryKey = [queryKeys.processSteps];
  const response = usePost<BaseResponse<BusinessStep[]>>(
    queryKey,
    GET_PROCESS_STEPS(query),
    {
      processId: processId
    },
    {
      enabled: !!processId
    }
  );
  return response;
};
