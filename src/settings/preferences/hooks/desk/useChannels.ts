import usePost from '@base/hooks/usePost';
import { FilterInput } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { GET_ALL_CHANNELS } from '@desk/ticket/services/graphql';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_DESK_CHANNELS } from '@settings/preferences/services/graphql/desk';
import { DeskChannel } from '@settings/preferences/types/desk/channel';

export const useChannels = (keyword: string, type?: string) => {
  let filter: FilterInput = {
    query: 'name:' + keyword + (type && ` type=${type}`)
  };
  let queryKey = [queryKeys.channels, keyword];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<DeskChannel[]>>(queryKey, GET_DESK_CHANNELS, params, {
    // initialData: settingTicketCategories(), // init fake data
  });
  return response;
};

export const useChannelsType = (keyword: string, type?: string) => {
  let filter: FilterInput = {
    query: (keyword && 'name:' + keyword) + (type && ` type=${type}`)
  };
  let queryKey = [queryKeys.channels, keyword, type];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<DeskChannel[]>>(queryKey, GET_ALL_CHANNELS, params, {
    // initialData: settingTicketCategories(), // init fake data
  });
  return response;
};
