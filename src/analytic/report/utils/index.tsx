import { EUserType } from '@analytic/main/types/enum';
import { sectionTitles } from '@analytic/main/config/sections';
import { chartBoxes as CChartBoxes } from '@analytic/main/config/charts';
import { t } from 'i18next';

export const getConfig = ({ userType, sectionType, charts, order }: any) => {
  return {
    title: t(sectionTitles[sectionType]),
    charts: charts.map((c: string) => {
      const { adminProps, ...restProps } = CChartBoxes?.[c] ?? {};
      if (userType === EUserType.USER_TYPE_ADMIN && !!adminProps) {
        return { ...restProps, ...adminProps };
      }
      return restProps;
    }),
    order: order
  };
};
