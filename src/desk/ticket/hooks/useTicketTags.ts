import usePosts from '@base/hooks/usePost';
import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { FilterInput, IdName } from '@base/types/common';
import { queryKeys } from '../config/queryKeys';
import { GET_ALL_PUBLIC_TAGS, GET_ALL_TAGS } from '../services/graphql';

export const useTicketTags = (keyword: string) => {
  let filter: FilterInput = {
    keyword: keyword
  };
  let queryKey = [queryKeys.tags, keyword];
  let params = {
    filter
  };
  const response = usePosts<any>(queryKey, GET_ALL_TAGS, params, {
    // initialData: ticketTagsFakeData(),
  });
  return response;
};

export const usePublicTicketTags = (keyword: string, token: string) => {
  let filter: FilterInput = {
    keyword: keyword
  };
  let queryKey = [queryKeys.publicTags, keyword];
  let params = {
    filter,
    token
  };
  const response = usePublicPosts<IdName[]>(queryKey, GET_ALL_PUBLIC_TAGS, params, {
    // initialData: ticketTagsFakeData(),
  });
  return response;
};
