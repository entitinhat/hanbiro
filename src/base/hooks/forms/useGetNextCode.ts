import { queryKeys } from '@base/config/queryKeys';
import { GET_NEXT_ID, GET_PUBLIC_NEXT_ID } from '@base/services/graphql/setting';
import usePublicPost from '@base/hooks/publics/usePublicPost';
import usePost from '@base/hooks/usePost';

interface CodeResponse {
  code: string;
  setting: any;
}

//get next id
export const useGetNextCode = (menu: string, index: number, value: string, isPublic: boolean, token: string) => {
  let response = null;
  if (isPublic) {
    response = usePublicPost<CodeResponse>(
      [queryKeys.trackingNextIdGet, menu, index],
      GET_PUBLIC_NEXT_ID,
      { menu, token },
      { enabled: value === '' }
    );
  } else {
    response = usePost<CodeResponse>([queryKeys.settingNextIdGet, menu, index], GET_NEXT_ID, { menu }, { enabled: value === '' });
  }
  return response;
};
