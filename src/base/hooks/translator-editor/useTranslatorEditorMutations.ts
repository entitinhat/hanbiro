import { CREATE_SYSTEM_LANGUAGE, UPDATE_SYSTEM_LANGUAGE } from '@base/services/graphql/translatorEditor';
import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '../useMutationPost';
import useSnackBar from '../useSnackBar';
import { queryKeys } from './queryKeys';

export const useTranslatorEditorMutations = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  /** mutation update */
  const mutationAdd: any = useMutationPost<BaseMutationResponse>(CREATE_SYSTEM_LANGUAGE, queryKeys.createSystemLanguage, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created language successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created language failed!');
    }
  });

  const mutationUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_SYSTEM_LANGUAGE, queryKeys.updateSystemLanguage, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated language successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated language failed!');
    }
  });

  return {
    mutationAdd,
    mutationUpdate
  };
};
