import React, {useEffect, useState} from 'react';
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarStacked from "@analytic/main/components/ApexCharts/BarStacked";
import {useGetActivityDateCounting} from "@analytic/main/hooks/useGetActivityDateCounting";
import { useTranslation } from 'react-i18next';

const ActivityByType = (props: ChartComponentProps) => {
  const { filters, ...restProps } = props;
  const { t } = useTranslation()
  const [listFilter, setListFilter] = useState<any>({
    filter: {
      ...(filters?.filter ?? {}),
    }
  });

  useEffect(() => {
    setListFilter({
      filter: {
        ...listFilter.filter,
        ...(filters?.filter ?? {}),
      }
    });
  }, [filters])

  const {data, isLoading, isFetching} = useChartQuery(restProps, () => {
    return useGetActivityDateCounting(listFilter ?? {}, {forWhichChart: 'ActivityByType'});
  });

  const { results = [], period } = data ?? {};

  let oData: any = {};
  if (!!results) {
    oData = results.reduce(
      (f: any, v: any) => {
        const { email, call, task, sms } = v?.counting ?? {};
        f['categories'].push(v?.date?.name ?? '-');
        f['email']['data'].push(email);
        f['call']['data'].push(call);
        f['task']['data'].push(task);
        f['sms']['data'].push(sms);
        return f;
      },
      {
        categories: [],
        email: {
          name: t('ncrm_dashboard_chart_field_email'),
          data: [],
        },
        call: {
          name: t('ncrm_dashboard_chart_field_call'),
          data: [],
        },
        task: {
          name: t('ncrm_dashboard_chart_field_task'),
          data: [],
        },
        sms: {
          name: t('ncrm_dashboard_chart_field_sms'),
          data: [],
        },
      },
    );
  }

  return <BarStacked
    categories={oData?.categories ?? []}
    series={[oData.email, oData.call, oData.task, oData.sms]}
  />;
};

export default ActivityByType;
