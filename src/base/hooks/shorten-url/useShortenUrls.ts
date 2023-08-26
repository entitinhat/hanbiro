import { queryKeys } from '@base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { GENERATE_SHORTEN_URLS } from '@base/services/graphql/shortenUrls';
import { BaseMutationResponse } from '@base/types/response';

export default function useCopyLink() {
  const mCopyLink: any = useMutationPost<BaseMutationResponse>(GENERATE_SHORTEN_URLS, queryKeys.shortenUrls);

  return { mCopyLink };
}
