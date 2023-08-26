// import usePost from '@base/hooks/usePost';
// import { FilterInput } from '@base/types/common';
// import { BaseResponse } from '@base/types/response';

// import { queryKeys } from '@settings/billing-license/config/products/queryKeys';
// import { Products } from '@settings/billing-license/types/products';
// import { GET_PRODUCTS } from '@settings/billing-license/services/graphql/Products';

// export const useProducts = (keyword: string) => {
//   let filter: FilterInput = {
//     query: 'name:' + keyword
//   };
//   let queryKey = [queryKeys.products, keyword];
//   let params = {
//     filter
//   };
//   const response = usePost<BaseResponse<Products[]>>(queryKey, GET_PRODUCTS, params, {
//     initialData: settingTicketCategories() // init fake data
//   });
//   return response;
// };
// function settingTicketCategories() {
//   return [
//     {
//       products: {
//         tableHeader: [
//           //  { id: 1, name: 'Product' },
//           { id: 2, name: 'Plan' },
//           { id: 3, name: 'Users' },
//           { id: 4, name: 'Actions' }
//         ],
//         tableBody: [
//           { id: 1, product: 'Confluence', plan: 'Free', users: '1', actions: 'Manage access' },
//           { id: 2, product: 'Jira Administration', plan: 'Free', users: '1', actions: 'Manage access' },
//           { id: 3, product: 'Jira Software', plan: 'Free', users: '2', actions: 'Manage access' }
//         ]
//       }
//     }
//   ];
// }
