import { useEffect, useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import useSnackBar from '@base/hooks/useSnackBar';
import useMutationPost from '@base/hooks/useMutationPost';

//menu
import { queryKeys } from '@campaign/config/queryKeys';
import { CAMPAIGN_TARGET_MEMBERS_GET, CAMPAIGN_TARGET_MEMBER_CREATE, CAMPAIGN_TARGET_MEMBER_DELETE } from '@campaign/services/graphql';

export function useCampaignTargetMembers(campaignId: string) {
  const queryKey = [queryKeys.targetMemberListGet, 'list', campaignId];
  const params = {
    filter: {
      query: `campaignId=${campaignId}`,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 100 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, CAMPAIGN_TARGET_MEMBERS_GET, params, {
    keepPreviousData: true
  });

  return postResult;
}

export function useCampaignTargetMemberCreate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CAMPAIGN_TARGET_MEMBER_CREATE, queryKeys.targetMemberCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Created campaign successfully!');
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
    },
    onSettled: () => {}
  });

  return mPostResult;
}

export function useCampaignTargetMemberDelete(campaignId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const queryKey = [queryKeys.targetMemberListGet, 'list', campaignId];

  const mPostResult = useMutationPost(CAMPAIGN_TARGET_MEMBER_DELETE, queryKeys.targetMemberDelete, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Deleted target member(s) successfully!');
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      // cancel all queries that contain the query key
      await queryClient.cancelQueries([queryKeys.targetMemberListGet]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(queryKey);
      if (!currentPage) {
        return;
      }
      //remove deleted items
      //console.log('currentPage.data', currentPage.data);
      //console.log('variables.ids', variables);
      let newItems = currentPage.data.filter((_item: any) => !variables.memberIds.includes(_item.id));

      //update current page
      queryClient.setQueryData(queryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during deleting, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(queryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      // ongoingMutationCount.current -= 1;
      // if (ongoingMutationCount.current === 0) {
      //   queryClient.invalidateQueries(queryKey);
      // }
    }
  });

  return mPostResult;
}
