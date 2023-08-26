import React from "react";
import {keys} from "lodash";
import {t} from "i18next";
import BarStacked from "@analytic/main/components/ApexCharts/BarStacked";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetCustomerRatingCounting} from "@analytic/main/hooks/useGetCustomerRatingCounting";

const CustomerRating = (props: ChartComponentProps) => {
  const {data, isLoading} = useChartQuery(props, () => {
    return useGetCustomerRatingCounting(props?.filters);
  });

  const { results = [], period = {} } = data ?? {};

  let oDatesByKey: any = {};
  let oAllRatings: any = {};
  let oData: any = {};

  if (!isLoading && results?.length) {
    for (const i in results) {
      const result = results[i];

      if (!!result?.date?.key) {
        const dateKey = result.date.key
        oDatesByKey[dateKey] = result.date.name;

        const oRatings: any = {};
        if (!!result?.countings) {
          for (const i2 in result.countings) {
            const ratingData = result.countings[i2];
            if (ratingData?.rating?.id) {
              const rating = {...ratingData.rating, count: ratingData.counting.total};
              oAllRatings[ratingData.rating.id] = rating;
              oRatings[ratingData.rating.id] = rating;
            }
          }
        }

        oData[dateKey] = oRatings;
      }
    }
  }

  const aDateKeys = keys(oDatesByKey)?.map((k) => {
    return oDatesByKey[k]
  }) ?? [];

  const aSeries: any[] = keys(oAllRatings)?.map((id) => {
    return {
      name: t(oAllRatings[id].keyName),
      data: keys(oDatesByKey).map((k) => {
        return oData?.[k]?.[id]?.count ?? 0
      })
    }
  }) ?? [];

  return (
    <BarStacked categories={aDateKeys} series={aSeries}/>
  );
};

export default CustomerRating;