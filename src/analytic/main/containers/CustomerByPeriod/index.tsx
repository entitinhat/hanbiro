import React from "react";
import {keys} from "lodash";
import MixedMultipleY from "@analytic/main/components/ApexCharts/MixedMultipleY";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetCustomerPeriodCounting} from "@analytic/main/hooks/useGetCustomerPeriodCounting";
import { useTranslation } from "react-i18next";

const CustomerPeriod = (props: ChartComponentProps) => {
  const {
    filters = {},
    ...restProps
  } = props;
  const { t } = useTranslation()
  const {data, isLoading} = useChartQuery(restProps, () => {
    return useGetCustomerPeriodCounting(filters);
  });

  const {results = []} = data ?? {};

  let oDatesByKey: any = {};
  let oData: any = {};

  if (!isLoading && !!results && !!results?.length) {
    for (const i in results) {
      const row = results[i];

      if (!!row?.date?.key) {
        const dateKey = row.date.key
        oDatesByKey[dateKey] = row.date.name;
        if (!!row?.counting) {
          oData[dateKey] = row.counting
        }
      }
    }
  }

  const aDateKeys = keys(oDatesByKey);

  const aDateNames = aDateKeys?.map((k) => {
    return oDatesByKey[k]
  })

  const aAccounts = aDateKeys.map((v) => {
    return oData[v]?.account ?? 0;
  })

  const aContacts = aDateKeys.map((v) => {
    return oData[v]?.contact ?? 0;
  })

  const aTotals = aDateKeys.map((v) => {
    return oData[v]?.total ?? 0;
  })

  const aSeries: any[] = [{
    name: t('ncrm_dashboard_chart_field_account'),
    type: 'column',
    data: aAccounts
  }, {
    name: t('ncrm_dashboard_chart_field_contact'),
    type: 'column',
    data: aContacts
  }, {
    name: t('ncrm_dashboard_chart_field_total'),
    type: 'line',
    data: aTotals
  }];

  return <MixedMultipleY categories={aDateNames} series={aSeries}/>;
};

export default CustomerPeriod;