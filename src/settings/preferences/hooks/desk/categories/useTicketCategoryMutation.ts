import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import {
  CREATE_TICKET_CATEGORY,
  CREATE_TICKET_CATEGORY_RULE,
  DELETE_TICKET_CATEGORY,
  DELETE_TICKET_CATEGORY_RULE,
  UPDATE_TICKET_CATEGORY,
  UPDATE_TICKET_CATEGORY_RULE,
  UPDATE_TICKET_CATEGORY_2
} from '@settings/preferences/services/graphql/desk';

export function useTicketCategoryMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const mAddCate: any = useMutationPost<BaseMutationResponse>(CREATE_TICKET_CATEGORY, queryKeys.createTicketCategory, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });

  const mUpdateCate: any = useMutationPost<BaseMutationResponse>(UPDATE_TICKET_CATEGORY, queryKeys.updateTicketCategory, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  const mDeleteCate: any = useMutationPost<BaseMutationResponse>(DELETE_TICKET_CATEGORY, queryKeys.deleteTicketCategory, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was remove!')
  });
  const mAddRule: any = useMutationPost<BaseMutationResponse>(CREATE_TICKET_CATEGORY_RULE, queryKeys.createTicketCategoryRule, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  const mUpdateRule: any = useMutationPost<BaseMutationResponse>(UPDATE_TICKET_CATEGORY_RULE, queryKeys.updateTicketCategoryRule, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  const mUpdateCate2: any = useMutationPost<BaseMutationResponse>(UPDATE_TICKET_CATEGORY_2, queryKeys.updateTicketCategoryRule, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  const mDeleteRule: any = useMutationPost<BaseMutationResponse>(DELETE_TICKET_CATEGORY_RULE, queryKeys.deleteTicketCategoryRule, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was remove!')
  });

  return {
    mAddCate,
    mUpdateCate,
    mDeleteCate,
    mAddRule,
    mUpdateRule,
    mUpdateCate2,
    mDeleteRule
  };
}
