import usePost from "@base/hooks/usePost";
import {Comparison, ComparisonsResponse} from "@activity/types/report";
import {keyStringify} from "@base/utils/helpers";
import {getComparisonUserQuery} from "@activity/services/graphql";
import {queryKeys} from "@analytic/main/config/queryKeys";

const defaultTotal = {
  outgoingCall: 0,
  incomingCall: 0,
  allCallDuration: 0,
  sentEmail: 0,
  receivedEmail: 0,
  sentSms: 0,
  task: 0
};

const fallback: any = {
  lastTotal: defaultTotal,
  results: [],
  total: defaultTotal
};

export const useGetActivityComparison = (schema: string, params: any, opts?: any) => {
  const results = usePost<ComparisonsResponse<Comparison>>(
    [queryKeys.activityComparison, keyStringify(params?.filter, '')],
    getComparisonUserQuery(schema),
    params,
    opts
  );

  return {
    data: results?.data ?? fallback,
    isLoading: results.isLoading,
    isFetching: results.isFetching,
    refetch: results.refetch,
  };
};