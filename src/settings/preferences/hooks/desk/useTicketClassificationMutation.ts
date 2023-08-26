import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import {
  CREATE_TICKET_CLASSIFICATION_SETTING,
  DELETE_TICKET_CLASSIFICATION_SETTING,
  UPDATE_TICKET_CLASSIFICATION_SETTING
} from '@settings/preferences/services/graphql/desk';

export default function useTicketClassificationMutation() {
  const { enqueueSuccessBar } = useSnackBar();

  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_TICKET_CLASSIFICATION_SETTING, queryKeys.updateTicketClassifications, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  const mAdd: any = useMutationPost<BaseMutationResponse>(CREATE_TICKET_CLASSIFICATION_SETTING, queryKeys.createTicketClassifications, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was created!')
    }
  });
  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_TICKET_CLASSIFICATION_SETTING, queryKeys.updateTicketClassifications, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was deleted!')
  });
  return { mUpdate, mAdd, mDelete };
}
