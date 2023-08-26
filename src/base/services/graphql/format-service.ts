import usePosts from "@base/hooks/usePosts";
import { gql } from "graphql-request";
export const SETTING_SELECTION_FIELD_GET = gql`
  query q($filter: FilterInput) {
    setting_selectionFields(filter: $filter) {
      results {
        id
        keyName
        languageKey
        keyGroup
        isDefault
        isBase
        languageData {
          en
          vi
          ko
          jp
          zh
          ido
        }
      }
    }
  }
`;

export const useSelectionFields = (params: any, options?: any) => {
  const usePostResult = usePosts<Selection[]>(
    ['setting_selectionFields', params.filter.query], //query keys
    SETTING_SELECTION_FIELD_GET,
    params,
    options
  );

  return usePostResult;
};