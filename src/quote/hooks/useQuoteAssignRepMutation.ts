import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { includes } from 'lodash';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { AssignToName } from '@base/types/user';
import { IdName } from '@base/types/common';
import { BaseMutationBulkKeysResponse, BaseMutationResponse } from '@base/types/response';

import { queryKeys } from '@quote/config/queryKeys';
import { QUOTE_CREATEASSIGNTO, QUOTE_CHANGEASSIGNTO, QUOTE_DELETEASSIGNTO } from '../services/graphql';
import { UserOrCustomer } from '@activity/types/activity';
import { Quote } from '@quote/types/interfaces';

// export default (isViewPage: boolean, filterKeys: any[]) => {
//   const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
//   const queryClient = useQueryClient();
//   let firstQuery = queryKeys.listQuote;

//   if (isViewPage) {
//     firstQuery = queryKeys.listAssignRep;
//   }

//   const rQueryKeys = [firstQuery, ...filterKeys];

//   const syncAddMutate = async (variables: any) => {
//     await queryClient.cancelQueries(rQueryKeys);

//     const previous = queryClient.getQueryData(rQueryKeys);
//     const optimistic = variables.assignTo as AssignToName[];

//     queryClient.setQueryData(rQueryKeys, (old: any) => {
//       const oResults = old?.results ?? [];
//       if (isViewPage) {
//         return { results: [...oResults, ...optimistic] };
//       } else {
//         const data = old?.data ?? [];
//         const addReps = optimistic.map((a: AssignToName) => {
//           return {
//             ...(a?.user ?? {})
//           };
//         });
//         const nData = data.map((item: Quote) => {
//           if (includes(variables.ids, item.id)) {
//             const aAssignTo = item?.['assignTo'] ?? [];
//             return {
//               ...item,
//               assignTo: [...aAssignTo, ...addReps]
//             };
//           } else {
//             return item;
//           }
//         });
//         return { ...old, data: nData };
//       }
//     });

//     return { previous };
//   };

//   const syncDeleteMutate = async (variables: any) => {
//     await queryClient.cancelQueries(rQueryKeys);

//     const previous = queryClient.getQueryData(rQueryKeys);
//     const optimistic = variables.assignTo as string[];
//     queryClient.setQueryData(rQueryKeys, (old: any) => {
//       if (isViewPage) {
//         return {
//           results: old?.results?.filter((v: UserOrCustomer) => !includes(optimistic, v.id))
//         };
//       } else {
//         const data = old?.data ?? [];
//         const optimistic = variables.refIds as string[];
//         const nData = data.map((item: Quote) => {
//           if (includes(variables.ids, item.id)) {
//             const aAssignTo = item['assignTo'] ?? [];
//             const nAssignTo = aAssignTo.filter((a: IdName) => {
//               return !includes(optimistic, a.id);
//             });
//             return {
//               ...item,
//               assignTo: nAssignTo
//             };
//           } else {
//             return item;
//           }
//         });
//         return {
//           ...old,
//           data: nData
//         };
//       }
//     });

//     return { previous };
//   };

//   const syncUpdateMutate = async (variables: any) => {
//     await queryClient.cancelQueries(rQueryKeys);
//     const previous = queryClient.getQueryData(rQueryKeys);
//     queryClient.setQueriesData(rQueryKeys, (old: any) => {
//       const optimistic = variables.ids as string[];
//       let results = old?.results ?? [];
//       if (isViewPage) {
//         results = old?.results?.map((v: UserOrCustomer) => {
//           if (includes(optimistic, v.id)) {
//             const uAssign = variables.assignTo.filter((vItem: UserOrCustomer) => vItem.id == v.id)[0];
//             return { ...v, ...uAssign };
//           }
//           return v;
//         });
//       } else {
//         const updateIds = variables.ids as string[];
//         const from = variables.from as AssignToName;
//         const to = variables.to as AssignToName;
//         const data = old.data ?? [];
//         const nData = data.map((item: Quote) => {
//           if (includes(updateIds, item.id)) {
//             const aAssignTo = item['assignTo'] ?? [];
//             const nAssignTo = aAssignTo.map((a: IdName) => {
//               if (a.id === from.user.id) {
//                 return to.user;
//               }
//               return a;
//             });
//             return {
//               ...item,
//               assignTo: nAssignTo
//             };
//           } else {
//             return item;
//           }
//         });
//         return {
//           ...old,
//           data: nData
//         };
//       }

//       return {
//         ...old,
//         results: results
//       };
//     });
//     return { previous };
//   };

//   const onError = (error: any, variables: any, context: any) => {
//     if (context.previous) {
//       queryClient.setQueryData(rQueryKeys, context.previous);
//     }
//     enqueueErrorBar('There is an error during processing, try again.');
//   };

//   const onSettled = () => {
//     queryClient.invalidateQueries(rQueryKeys);
//   };

//   const mCreate = useMutationPost<BaseMutationBulkKeysResponse>(QUOTE_CREATEASSIGNTO, queryKeys.createAssignRep, {
//     onMutate: syncAddMutate,
//     onSettled: onSettled,
//     onError: onError,
//     onSuccess: () => enqueueSuccessBar('Reps assigned successfully!')
//   });

//   const mUpdate = useMutationPost<BaseMutationBulkKeysResponse>(QUOTE_CHANGEASSIGNTO, queryKeys.changeAssignRep, {
//     onMutate: syncUpdateMutate,
//     onSettled: onSettled,
//     onError: onError,
//     onSuccess: () => enqueueSuccessBar('Reps updated successfully!')
//   });

//   const mDelete = useMutationPost<BaseMutationBulkKeysResponse>(QUOTE_DELETEASSIGNTO, queryKeys.deleteAssignRep, {
//     onMutate: syncDeleteMutate,
//     onSettled: onSettled,
//     onError: onError,
//     onSuccess: () => enqueueSuccessBar('Reps deleted successfully!')
//   });

//   return { mCreate, mDelete, mUpdate };
// };

/** ================== quote - assign reps ===================== */

export const useQuoteAssignRepCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(QUOTE_CREATEASSIGNTO, queryKeys.createAssignRep, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Created survey successfully!');

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([queryKeys.listAssignRep]); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>([queryKeys.listAssignRep]);
      //console.log('onMutate currentPage', currentPage);
      if (!currentPage) {
        return;
      }
      //create object
      const newItem = variables.assignTo[0].user;
      let newItems = [...currentPage.data];
      //add new item to first
      newItems.unshift(newItem);
      //console.log('onSuccess newItems', newItems);

      //adjust current page
      queryClient.setQueryData([queryKeys.listAssignRep], {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      //enqueueErrorBar('There is an error during creating, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData([queryKeys.listAssignRep], context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.listAssignRep]);
        }, 1000);
      }
    }
  });

  return mPost;
};

export const useQuoteAssignRepDelete = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(QUOTE_DELETEASSIGNTO, queryKeys.deleteAssignRep, {
    onSuccess: (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Deleted survey successfully!');
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([queryKeys.listAssignRep]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any[] }>([queryKeys.listAssignRep]);
      //console.log('onMutate currentPage', currentPage);
      if (!currentPage) {
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: any) => !variables.refIds.includes(_item.id));

      //update current page
      queryClient.setQueryData([queryKeys.listAssignRep], {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during deleting, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData([queryKeys.listAssignRep], context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        queryClient.invalidateQueries([queryKeys.listAssignRep]);
      }
    }
  });

  return mPost;
};
