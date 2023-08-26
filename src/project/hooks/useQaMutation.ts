import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import {
    CREATE_TASK_QA_TEMPLATE, DELETE_TASK_QA_TEMPLATE, UPDATE_TASK_QA_TEMPLATE
} from '@project/services/template';
import { QAType } from '@project/types/task';
import { useQueryClient } from '@tanstack/react-query';

interface useQaMutateProps {
  id: string;
  type: QAType;
  onChange?: (success: boolean) => void;
}

export default function useQaMutation(props: useQaMutateProps) {
  const { id, type, onChange } = props;
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  let keys: Record<string, any> = {
    list: [],
    create: {},
    update: {},
    delete: {}
  };
  if (type == 'TEMPLATE') {
    keys.list = [queryKeys.getTaskTemplate, id];
    keys.create = { schema: CREATE_TASK_QA_TEMPLATE, key: queryKeys.createTaskQaTemplate };
    keys.update = { schema: UPDATE_TASK_QA_TEMPLATE, key: queryKeys.updateTaskQaTemplate };
    keys.delete = { schema: DELETE_TASK_QA_TEMPLATE, key: queryKeys.deleteTaskQaTemplate };
  }

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log('errorMutate', error);
    enqueueErrorBar("It can't save your data");
    onChange && onChange(false);
  };

  const settledMutate = (data: any, error: any, variables: any, context: any) => {
    console.log('settleMutate', data, error);
    setTimeout(() => {
      queryClient.invalidateQueries(keys.list);
    }, SET_TIMEOUT);
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onChange && onChange(true);
  };

  const mAddQa: any = useMutationPost(keys.create.schema, keys.create.key, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdateQa: any = useMutationPost(keys.updateschema, keys.update.key, {
    onSuccess: successMutate,
    onError: errorMutate
    // onSettled: settledMutate
  });

  const mDeleteQa: any = useMutationPost(keys.delete.schema, keys.delete.key, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddQa, mUpdateQa, mDeleteQa };
}
