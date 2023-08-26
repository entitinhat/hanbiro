import React from "react";
import { Divider, Stack } from '@mui/material';
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetCustomerTrendCounting} from "@analytic/main/hooks/useGetCustomerTrendCounting";
import TrendItem from "@analytic/main/components/TrendItem";
import { useTranslation } from "react-i18next";

const CustomerTrend = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetCustomerTrendCounting(props?.filters ?? {})
  });
  const { t } = useTranslation()

  const {firstCounting = {}, lastCounting = {}}: any = data ?? {};

  return (
    <Stack
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      spacing={0}
      divider={<Divider orientation="horizontal" variant="middle" flexItem />}
      height="100%"
    >
      <TrendItem title={t('ncrm_dashboard_chart_field_total')} newValue={firstCounting?.total} oldValue={lastCounting?.total} />
      <TrendItem title={t('ncrm_dashboard_chart_field_account')} newValue={firstCounting?.account} oldValue={lastCounting?.account} />
      <TrendItem title={t('ncrm_dashboard_chart_field_contact')} newValue={firstCounting?.contact} oldValue={lastCounting?.contact} />
    </Stack>
  );
};

export default CustomerTrend;