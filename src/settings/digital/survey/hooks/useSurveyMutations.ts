import useMutationPost from '@base/hooks/useMutationPost';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { keyStringify } from '@base/utils/helpers';
import { SITE_SURVEY_ANSWER_CREATE } from '@public-page/site/services/graphql';
import { queryKeys } from '@settings/digital/survey/config/queryKeys';
import { SURVEY_CREATE, SURVEY_DELETE, SURVEY_RESPONSE_CREATE, SURVEY_UPDATE } from '@settings/digital/survey/services/graphql';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

export const useSurveyAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SURVEY_RESPONSE_CREATE, queryKeys.surveyAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};

export const useSiteSurveyAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_SURVEY_ANSWER_CREATE, queryKeys.siteDigitalSurveyAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};

export const useSurveyCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `setting_survey`;
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);

  //build filter
  let filtersQuery: any = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery?.trim();
  const listQueryKey = [queryKeys.surveysGet, keyStringify(filtersQuery, '')];

  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SURVEY_CREATE, queryKeys.surveyCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created survey successfully!');

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([queryKeys.surveysGet]); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.surveysGet, keyStringify(nextFilterQuery, '')];
      const nextPage = queryClient.getQueryData<{ data: any[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }
      //create object
      const newItem: any = {
        id: data.id,
        ...variables.survey
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
          queryClient.invalidateQueries([queryKeys.surveysGet]);
        }, 1000);
      }
    }
  });

  return mPost;
};

export const useSurveyUpdate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SURVEY_UPDATE, queryKeys.surveyCreate, {
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

export const useSurveyDelete = ({ onCancel }: DeleteProps) => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `setting_survey`;
  const { filterQuery, sort, paging } = useListPageSettings(pageDataKey);

  //build filter
  let filtersQuery: any = {
    sort,
    paging
  };
  //build query
  filtersQuery.query = filterQuery?.trim();
  const listQueryKey = [queryKeys.surveysGet, keyStringify(filtersQuery, '')];

  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SURVEY_DELETE, queryKeys.surveyDelete, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted survey successfully!');
      onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([queryKeys.surveysGet]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.surveysGet, keyStringify(nextFilterQuery, '')];
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
        queryClient.invalidateQueries([queryKeys.surveysGet]);
      }
    }
  });

  return mPost;
};
