
import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import usePost from '@base/hooks/usePost';
import { queryKeys } from '@vora-works/config/queryKeys';
import { FINISH_REGISTER_FREE_LICENSE } from '@vora-works/services/graphql/license';
interface GetFinishRegisterLicense {
  registerId:string;
}

export const useFinishRegisterLicense = (params: GetFinishRegisterLicense, opts?: any) => {
  const queryKey: string[] = [queryKeys.finishedRegisterFreeLicense, JSON.stringify(params)];

  const variables: any = {
    ...params
  };
  const response = usePost<any>(queryKey, FINISH_REGISTER_FREE_LICENSE, variables, {
    ...opts
  });
  return response;
};
