import React from 'react';

import { isString, isUndefined } from 'lodash';
import { default as TextView } from '../Text/View';
import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  const fieldLabel = componentProps?.fieldLabel ?? 'languageKey';
  const fieldValue = componentProps?.fieldValue ?? 'keyName';

  // get field attrs
  const getValueView = (): string => {
    return !isUndefined(value[fieldLabel]) ? t(value[fieldLabel]) : '';
  };
  return value ? <TextView value={getValueView()} /> : '';
};

export default View;
