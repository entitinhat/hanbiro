import { queryKeys } from '@activity/config/queryKeys';
import {getComparisonUserQuery} from '@activity/services/graphql';
import { keyStringify } from '@base/utils/helpers';
import {ComparisonsResponse, Comparison} from "@activity/types/report";
import usePost from "@base/hooks/usePost";

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

export const useComparisonUsers = (schema: string, params: any, opts?: any) => {
  const { data: results = fallback, refetch, status } = usePost<ComparisonsResponse<Comparison>>(
    [queryKeys.listComparisonUser, keyStringify(params?.filter, '')],
    getComparisonUserQuery(schema),
    params,
    opts
  );

  console.log(results, 'useComparisonUsers')

  return { results, refetch, status };
};
