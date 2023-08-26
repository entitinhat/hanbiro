import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import useSnackBar from '@base/hooks/useSnackBar';
import { keyStringify } from '@base/utils/helpers';
import { MENU_CUSTOMER } from '@base/config/menus';

//menu
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { MARKETING_DELETE } from '@marketing-list/services/graphql';
import { getFilterParam } from '@marketing-list/hooks/useMarketingLists';

interface DeleteProps {
  category: string;
  onCancel?: () => void;
  onReload?: () => void;
}

export default function useMarketingDelete() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(MARKETING_DELETE, marketingQueryKeys.marketingDelete, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted marketing list(s) successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('There is an error during deleting, try again.');
    },
    onSettled: () => {
      queryClient.invalidateQueries([marketingQueryKeys.marketingListsGet]);
    }
  });

  return mPostResult;
}
