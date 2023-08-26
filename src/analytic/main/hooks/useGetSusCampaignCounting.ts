import {queryKeys} from "@analytic/main/config/queryKeys";
import {FilterInput} from "@base/types/common";
import usePost from "@base/hooks/usePost";
import {keyStringify} from "@base/utils/helpers";
import {getQueryString} from "@analytic/main/services";
import {
  ANALYTIC_CAMPAIGN_COUNTING_SCHEMA
} from "@analytic/main/services/susGraphql";
import {ResponsePaging} from "@base/types/response";
import {IdNameNumber} from "@analytic/main/types/interfaces";

export default (variables: FilterInput) => {
  return usePost<ResponsePaging<IdNameNumber[]>>(
    [queryKeys.susCampaignCounting, keyStringify(variables, '')],
    getQueryString(queryKeys.susCampaignCounting, ANALYTIC_CAMPAIGN_COUNTING_SCHEMA),
    variables,
  );
};