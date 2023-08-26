import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse, DatasPromise } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { queryKeys } from '../config/queryKeys';
import { ANALYTIC_COPYREPORT, ANALYTIC_CREATEREPORT, ANALYTIC_DELETEREPORT } from '../services/graphql';
import { Report } from '../types/reports';

export default function useReportMutation(listQueryKey: any[]) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();
  const rQueryKeys = [queryKeys.listReport, ...listQueryKey];

  const syncExceptMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return { ...old, data: old.data?.filter((v: Report) => !optimistic.includes(v.id)) };
    });

    return { previous };
  };

  const syncAddMutate = async (params: any) => {
    const { report } = params;
    await queryClient.cancelQueries(rQueryKeys);
    const previousDatas = queryClient.getQueryData<DatasPromise<any>>(rQueryKeys);
    if (previousDatas) {
      const newData = [{ ...report }, ...previousDatas.data];
      queryClient.setQueryData<DatasPromise<any>>(rQueryKeys, {
        ...previousDatas,
        data: [...newData]
      });
    }

    return { previousDatas };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mDeleteReport: any = useMutationPost<BaseMutationResponse>(ANALYTIC_DELETEREPORT, queryKeys.deleteReport, {
    onMutate: syncExceptMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Deleted Report successfully!')
  });

  const mAddReport: any = useMutationPost<BaseMutationResponse>(ANALYTIC_CREATEREPORT, queryKeys.createReport, {
    onSuccess: () => enqueueSuccessBar('Create Report successfully!'),
    onError: errorMutate,
    onSettled: settledMutate,
    onMutate: syncAddMutate
  });

  const mCopyReport: any = useMutationPost<BaseMutationResponse>(ANALYTIC_COPYREPORT, queryKeys.copyReport, {
    onSuccess: () => enqueueSuccessBar('Data was copied...'),
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mDeleteReport, mAddReport, mCopyReport };
}
