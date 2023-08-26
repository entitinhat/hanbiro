import React from 'react';
import { useTranslation } from 'react-i18next';

import { default as TextView } from '../Text/View';
import { CommonViewProps } from '../Common/interface';
import { moneyFormat } from '@base/utils/helpers/generalUtils';
import { useRecoilValue } from 'recoil';
import { defaultCurrencySelector } from '@base/store/selectors/app';

interface ViewProps extends CommonViewProps {
  value?: number | string;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  //get default currency and set prefix
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  const prefix = defaultCurrency?.code || '$';

  return <TextView value={`${prefix + ' '}${moneyFormat(value?.toString() || '0')}`} />;
};

export default View;
