import * as keyNames from '@activity/config/keyNames';
import TableBodyCell from '@activity/pages/ComparisonPage/TableBodyCell';
import { round } from 'lodash';
import { convertSecondsToString } from '@base/utils/helpers/dateUtils';
import SpanLang from '@base/components/@hanbiro/SpanLang';

export const columnRenderRemap = () => ({
  [keyNames.KEY_NAME_COMPARISON_GROUPNAME](col: string, data: any) {
    return data?.[col]?.name ?? <SpanLang keyLang="ncrm_common_unknown" />;
  },
  [keyNames.KEY_NAME_COMPARISON_USERNAME](col: string, data: any) {
    return data?.[col]?.name ?? <SpanLang keyLang="ncrm_common_unknown" />;
  },
  [keyNames.KEY_NAME_COMPARISON_OUTGOING_CALL](col: string, data: any) {
    return <TableBodyCell keyName={col} data={data} />;
  },
  [keyNames.KEY_NAME_COMPARISON_INCOMING_CALL](col: string, data: any) {
    return <TableBodyCell keyName={col} data={data} />;
  },
  [keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION](col: string, data: any) {
    const iSeconds = data?.total?.[col] ?? 0;
    const timeStr = convertSecondsToString(iSeconds);
    return <TableBodyCell keyName={col} data={data} viewValue={timeStr} />;
  },
  [keyNames.KEY_NAME_COMPARISON_SENT_EMAIL](col: string, data: any) {
    return <TableBodyCell keyName={col} data={data} />;
  },
  [keyNames.KEY_NAME_COMPARISON_RECEIVED_EMAIL](col: string, data: any) {
    return <TableBodyCell keyName={col} data={data} />;
  },
  [keyNames.KEY_NAME_COMPARISON_SENT_SMS](col: string, data: any) {
    return <TableBodyCell keyName={col} data={data} />;
  },
  [keyNames.KEY_NAME_COMPARISON_TASK](col: string, data: any) {
    return <TableBodyCell keyName={col} data={data} />;
  }
});

export const footCellData = (data: any, lastData: any, keyName: string, isFindPercent: boolean = false): any => {
  let newValue: number = data?.[keyName] ?? 0;
  const oldValue: number = lastData?.[keyName] ?? 0;
  let valuingDifference: number | string = Math.abs(newValue - oldValue);
  const isUp = newValue > oldValue;
  const isDown = newValue < oldValue;

  if (keyName == keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION && valuingDifference) {
    valuingDifference = convertSecondsToString(valuingDifference);
  }

  if (isFindPercent) {
    newValue = oldValue > 0 ? round((newValue * 100) / oldValue - 100, 2) : newValue > 0 ? 100 : 0;
    valuingDifference = ` ${Math.abs(newValue)} %`;
  }

  return {
    value: newValue,
    isUp,
    isDown,
    valuingDifference
  };
};

//  '(period>="2022-11-01T00:00:00.000Z" period<="2022-11-30T23:59:59.999Z") (lastPeriod>="2022-10-01T00:00:00.000Z" lastPeriod<="2022-10-31T23:59:59.999Z")'
interface Criteria {
  value: string;
  operator: string;
}
interface Period {
  condition: string;
  criteria: Criteria[];
}
export const getParseFilterQuery = (data: { period: Period; lastPeriod: Period }) => {
  let lastPeriodQuery: string[] = [];
  let periodQuery: string[] = [];
  if (data?.period) {
    data.period.criteria.forEach((_cri) => {
      let value = 'period' + _cri.operator + '"' + _cri.value + '"';
      periodQuery.push(value);
    });
  }
  if (data?.lastPeriod) {
    data.lastPeriod.criteria.forEach((_cri) => {
      let value = 'lastPeriod' + _cri.operator + '"' + _cri.value + '"';
      lastPeriodQuery.push(value);
    });
  }
  return `(${periodQuery.join(' ')})  (${lastPeriodQuery.join(' ')})`;
};
