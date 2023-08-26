import useMutationPost from '@base/hooks/useMutationPost';
import { queryKeys } from '@vora-works/config/queryKeys';
import { REGISTER_FREE_LICENSE } from '@vora-works/services/graphql/license';
import { RegisterFreeLicenseResponse } from '@vora-works/types';

export default function useRegisterFreeLicense() {
  const mMutation: any = useMutationPost<RegisterFreeLicenseResponse>(REGISTER_FREE_LICENSE, queryKeys.registerFreeLicense);

  return mMutation;
}
