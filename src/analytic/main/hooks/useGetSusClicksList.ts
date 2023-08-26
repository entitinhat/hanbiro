import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";
import {getListQuery} from "@base/utils/helpers/schema";
import useInfinitePosts from "@base/hooks/useInfinitePosts";
import {SusClick} from "@analytic/main/types/interfaces/sus";

export const useGetSusClicksList = (params: any) => {
  return useInfinitePosts<SusClick[]>(
    [queryKeys.susClicks, JSON.stringify(keyStringify(params, ''))],
    getListQuery(
      queryKeys.susClicks,
      `
      id
      log{
        id
        cta {
          id
          name
        }
      }
      extraData
      createdAt
      createdBy {
        id
        name
      }`
    ),
    params,
    {
      keepPreviousData: true
    }
  );
};