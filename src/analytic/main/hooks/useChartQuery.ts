import {useEffect} from "react";
import {UseQueryResult} from "@tanstack/react-query";

export const useChartQuery = (props: any, fetchData: (() => any), opts: any = null): UseQueryResult<any> => {
  const {setLoading} = props;

  const queryResults = fetchData();

  useEffect(() => {
    setLoading && setLoading(queryResults?.isLoading || queryResults?.isFetching);
  }, [queryResults?.isLoading, queryResults?.isFetching]);

  return queryResults;
}