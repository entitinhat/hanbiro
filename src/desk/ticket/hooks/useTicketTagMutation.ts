import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { gql } from 'graphql-request';
import { UPDATE_TICKET } from '../services/graphql';
export default function useDeskTicketTagMutation() {
  const { enqueueSuccessBar } = useSnackBar();

  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_TICKET, 'ticket', {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
    }
  });
  return { mUpdate };
}
