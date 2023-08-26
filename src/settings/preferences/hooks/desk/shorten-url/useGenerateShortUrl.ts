import { queryKeys } from '@base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { GENERATE_SHORTEN_URL } from '@base/services/graphql/shortenUrl';

export default function useGenerateShortUrl() {
  const mGenerateShortUrl: any = useMutationPost<BaseMutationResponse>(GENERATE_SHORTEN_URL, queryKeys.shortenUrl);

  return { mGenerateShortUrl };
}
