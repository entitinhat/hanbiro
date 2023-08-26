import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { keyStringify } from '@base/utils/helpers';
import { GET_SURVEY_LIST } from '@settings/digital/survey/services/graphql';

export const usGetSurveyList = (filter?: FilterInput) => {
  //params: sample
  let params: any = {
    filter: {
      filters: {},
      keyword: '',
      paging: {
        page: 1,
        size: 999
      },
      ...filter
    }
  };

  const response = usePosts<any[]>(['setting_surveys', keyStringify(params.filter, '')], GET_SURVEY_LIST, params, {
    enables: true
  });
  return response;
};
