//third-party

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { buildListSchema, getListQuery, keyStringify } from '@base/utils/helpers/schema';

//menu
import { default as configFields } from '@settings/digital/ticket-form/config/view-field';
import { queryKeys } from '@settings/digital/ticket-form/config/queryKeys';
import { gql } from 'graphql-request';

const GET_LIST_FORM = gql`
  query q($filter: SearchFilter) {
    setting_ticketForms(filter: $filter) {
      results {
        id
        name
        html
      }
    }
  }
`;
export const useForms = () => {
  //console.log('filterQuery', filterQuery);

  //build filter
  let filtersQuery = {
    sort: {
      field: 'createdAt',
      orderBy: 2
    },
    paging: {}
  };
  //build query

  //get params
  let params = {
    filter: filtersQuery
  };

  const usePostResult = usePosts<any[]>([queryKeys.ticketFormsGet, keyStringify(filtersQuery, '')], GET_LIST_FORM, params);

  return usePostResult;
};
