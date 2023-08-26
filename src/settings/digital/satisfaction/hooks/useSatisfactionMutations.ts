import useMutationPost from '@base/hooks/useMutationPost';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { keyStringify } from '@base/utils/helpers';
import { SITE_SURVEY_ANSWER_CREATE } from '@public-page/site/services/graphql';
import { queryKeys } from '@settings/digital/satisfaction/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import {
  SATISFACTION_SURVEY_CREATE,
  SATISFACTION_SURVEY_DELETE,
  SATISFACTION_SURVEY_RESPONSE_CREATE,
  SATISFACTION_SURVEY_UPDATE
} from '../services/graphql';

export const useSatisfactionAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SATISFACTION_SURVEY_RESPONSE_CREATE, queryKeys.satisfactionAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};

export const useSatisfactionCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `setting_satisfaction_survey`;
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);

  //build filter
  let filtersQuery: any = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery?.trim();
  const listQueryKey = [queryKeys.satisfactionSurveysGet, keyStringify(filtersQuery, '')];

  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SATISFACTION_SURVEY_CREATE, queryKeys.satisfactionSurveyCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created survey successfully!');

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([queryKeys.satisfactionSurveysGet]); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.satisfactionSurveysGet, keyStringify(nextFilterQuery, '')];
      const nextPage = queryClient.getQueryData<{ data: any[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }
      //create object
      const newItem: any = {
        ...variables.satisfactionSurvey,
        id: data.id,
        createdBy: { id: '111', name: 'Hanbiro Test 1' } //TODO: logged in user
      };
      let newItems = [...currentPage.data];
      //add new item to first
      newItems.unshift(newItem);
      //remove last item
      const [lastItem] = newItems.splice(newItems.length - 1, 1);
      //insert last item to second page list
      const newNextItems = nextPage?.data ? [...nextPage.data] : [];
      newNextItems.unshift(lastItem);
      //console.log('onSuccess newItems', newItems);

      //adjust current page
      queryClient.setQueryData(listQueryKey, {
        ...currentPage,
        data: newItems
      });

      //adjust next page
      queryClient.setQueryData(nextQueryKey, {
        ...nextPage,
        data: newNextItems
      });

      return { currentItemsPage: currentPage };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(listQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.satisfactionSurveysGet]);
        }, 1000);
      }
    }
  });

  return mPost;
};

export const useSatisfactionUpdate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SATISFACTION_SURVEY_UPDATE, queryKeys.satisfactionSurveyUpdate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated survey successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated survey failed');
    }
  });

  return mPost;
};

interface DeleteProps {
  onCancel?: () => void;
}

export const useSatisfactionDelete = ({ onCancel }: DeleteProps) => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `setting_satisfaction_survey`;
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);

  //build filter
  let filtersQuery: any = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery?.trim();
  const listQueryKey = [queryKeys.satisfactionSurveysGet, keyStringify(filtersQuery, '')];

  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SATISFACTION_SURVEY_DELETE, queryKeys.satisfactionSurveyDelete, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted survey successfully!');
      onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([queryKeys.satisfactionSurveysGet]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.satisfactionSurveysGet, keyStringify(nextFilterQuery, '')];
      const nextPage = queryClient.getQueryData<{ data: any[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: any) => !variables.ids.includes(_item.id));

      //add new items from next page
      if (nextPage?.data.length) {
        //get number of items = number of deleted items
        const nextItems = nextPage.data.slice(0, variables.ids.length);
        if (nextItems) {
          newItems = newItems.concat(nextItems);
        }
      }
      //console.log('onMutate nextPage 2', newItems);

      //update current page
      queryClient.setQueryData(listQueryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during deleting, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(listQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        queryClient.invalidateQueries([queryKeys.satisfactionSurveysGet]);
      }
    }
  });

  return mPost;
};

/** =========== public site ==========*/

export const useSiteSatisfactionAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_SURVEY_ANSWER_CREATE, queryKeys.siteSatisfactionAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};
