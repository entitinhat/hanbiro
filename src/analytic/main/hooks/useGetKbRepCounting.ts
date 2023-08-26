import {BaseResponse} from "@base/types/response";
import {FilterInput} from "@base/types/common";
import {getQueryString} from "@analytic/main/services";
import usePost from "@base/hooks/usePost";
import {KbRepCounting} from "@analytic/main/types/interfaces/desk";
import {keyStringify} from "@base/utils/helpers";
import {queryKeys} from "@analytic/main/config/queryKeys";

export const useGetKbRepCounting = (filter: FilterInput, fieldSchema: string = '', opts?: {forWhichChart?: string}) => {
  if (fieldSchema == '') {
    fieldSchema = `
      published
      viewed
      inserted
    `;
  }

  return  usePost<BaseResponse<KbRepCounting>>(
    [queryKeys.kbRepCounting, keyStringify(filter, ''), fieldSchema, opts?.forWhichChart ?? ''],
    getQueryString(
      queryKeys.kbRepCounting,
      `
      results {
        user {
          id
          name
        }
        counting {
          ${fieldSchema}
        }
      }
    `,
    ),
    filter,
  );
};