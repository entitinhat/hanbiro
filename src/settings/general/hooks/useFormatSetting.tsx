import usePost from '@base/hooks/usePost';
import { formatSettingsAtom } from '@base/store/atoms';
import { BaseResponse } from '@base/types/response';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GET_ALL_FORMAT_SETTING } from '../services/graphql';
import { CurrencySetting, DateSetting, FormatSetting, NumberSetting, TimeSetting } from '../types/interface';
import { queryKeys } from '@settings/general/config/queryKeys';
import { currencySettingSelector, dateSettingSelector, numberSettingSelector, timeSettingSelector } from '@base/store/selectors/app';

declare global {
  interface Window {
    [x: string]: any;
  }
}

export const useFormatSettings = () => {
  const { data: formatSetting, isLoading } = usePost<BaseResponse<FormatSetting[]>>(
    [queryKeys.settingFormatSettings],
    GET_ALL_FORMAT_SETTING,
    {}
  );

  const setFormatSettings = useSetRecoilState(formatSettingsAtom);

  useEffect(() => {
    if (!isLoading && formatSetting && formatSetting?.results?.length > 0) {
      if (formatSetting) {
        const parseData = formatSetting?.results?.map((item: FormatSetting) => {
          if (typeof item.value === 'string') {
            return {
              ...item,
              value: JSON.parse(item.value)
            };
          }
          return item;
        });
        setFormatSettings(parseData);
      }
    }
  }, [formatSetting, isLoading]);

  const dateFormat: DateSetting = useRecoilValue(dateSettingSelector);
  window.dateFormat = dateFormat;

  const timeFormat: TimeSetting = useRecoilValue(timeSettingSelector);
  window.timeFormat = timeFormat;

  const numberFormat: NumberSetting = useRecoilValue(numberSettingSelector);
  window.numberFormat = numberFormat;

  const currencyFormat: CurrencySetting = useRecoilValue(currencySettingSelector);
  window.currencyFormat = currencyFormat;

  return;
};
