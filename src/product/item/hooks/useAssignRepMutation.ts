import _ from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { AssignToName } from '@base/types/user';
import { IdName } from '@base/types/common';

import { queryKeys } from '@product/item/config/queryKeys';
import { UserOrCustomer } from '@activity/types/activity';
import { Item } from '../types/item';
import { CHANGE_ITEM_ASSIGN_REP, CREATE_ITEM_ASSIGN_REP, DELETE_ITEM_ASSIGN_REP } from '../services/graphql';
import { BaseMutationBulkKeysResponse } from '@base/types/response';

export const useAssignRepMutation = (isViewPage: boolean, filterKeys: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  let firstQuery = queryKeys.listItem;
  if (isViewPage) {
    firstQuery = queryKeys.listAssignRep;
  }
  const rQueryKeys = [firstQuery, ...filterKeys];
  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    console.log('syncAddMutate', previous);
    const optimistic = variables.assignTo as UserOrCustomer[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const oResults = old?.results ?? [];
      if (isViewPage) {
        return { results: [...oResults, ...optimistic] };
      } else {
        const data = old.data ?? [];
        const assignTo = variables.assignTo as AssignToName[];
        const addReps = assignTo.map((_a: AssignToName) => {
          return {
            ..._a.user
          };
        });
        const nData = data.map((_item: Item) => {
          if (_.includes(variables.ids, _item.id)) {
            const aAssignTo = _item['assignTo'] ?? [];
            return {
              ..._item,
              assignTo: [...aAssignTo, ...addReps]
            };
          } else {
            return _item;
          }
        });
        return { ...old, data: nData };
      }
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.assignTo as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      if (isViewPage) {
        return {
          results: old?.results?.filter((v: UserOrCustomer) => !_.includes(optimistic, v.id))
        };
      } else {
        const data = old.data ?? [];
        const optimistic = variables.refIds as string[];
        const nData = data.map((_item: Item) => {
          if (_.includes(variables.ids, _item.id)) {
            const aAssignTo = _item['assignTo'] ?? [];
            const nAssignTo = aAssignTo.filter((_as: IdName) => {
              return !_.includes(optimistic, _as.id);
            });
            return {
              ..._item,
              assignTo: nAssignTo
            };
          } else {
            return _item;
          }
        });
        return {
          ...old,
          data: nData
        };
      }
    });

    return { previous };
  };

  const syncUpdateMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);
    const previous = queryClient.getQueryData(rQueryKeys);
    // from: {
    //   user: {
    //     id: fromRep?.id,
    //     name: fromRep?.name
    //   },
    //   group: {}
    // },
    // to: {
    //   user: {
    //     id: toRep?.id,
    //     name: toRep?.name
    //   },
    //   group: {}
    // }
    queryClient.setQueriesData(rQueryKeys, (old: any) => {
      const optimistic = variables.ids as string[];
      let results = old.results ?? [];
      if (isViewPage) {
        results = old?.results?.map((v: UserOrCustomer) => {
          if (_.includes(optimistic, v.id)) {
            const uAssign = variables.assignTo.filter((vItem: UserOrCustomer) => vItem.id == v.id)[0];
            return { ...v, ...uAssign };
          }
          return v;
        });
      } else {
        const updateIds = variables.ids as string[];
        const from = variables.from as AssignToName;
        const to = variables.to as AssignToName;
        const data = old.data ?? [];
        const nData = data.map((_item: Item) => {
          if (_.includes(updateIds, _item.id)) {
            const aAssignTo = _item['assignTo'] ?? [];
            const nAssignTo = aAssignTo.map((_as: IdName) => {
              if (_as?.id === from?.user?.id) {
                return to?.user;
              }
              return _as;
            });
            return {
              ..._item,
              assignTo: nAssignTo
            };
          } else {
            return _item;
          }
        });
        return {
          ...old,
          data: nData
        };
      }

      return {
        ...old,
        results: results
      };
    });
    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mAssignRep = useMutationPost<BaseMutationBulkKeysResponse>(CREATE_ITEM_ASSIGN_REP, queryKeys.createAssignRep, {
    // onMutate: syncAddMutate,
    onSettled: settledMutate,
    onError: errorMutate,
    onSuccess: () => enqueueSuccessBar('Create assign rep successfully!')
  });

  const mChangeRep = useMutationPost<BaseMutationBulkKeysResponse>(CHANGE_ITEM_ASSIGN_REP, queryKeys.changeAssignRep, {
    // onMutate: syncUpdateMutate,
    onSettled: settledMutate,
    onError: errorMutate,
    onSuccess: () => enqueueSuccessBar('Change assign rep successfully!')
  });

  const mDeleteRep = useMutationPost<BaseMutationBulkKeysResponse>(DELETE_ITEM_ASSIGN_REP, queryKeys.deleteAssignRep, {
    // onMutate: syncDeleteMutate,
    onSettled: settledMutate,
    onError: errorMutate,
    onSuccess: () => enqueueSuccessBar('Delete assign rep successfully!')
  });

  return { mAssignRep, mDeleteRep, mChangeRep };
};
