import React, { useEffect, useMemo, useState } from 'react';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import TextView from '@base/containers/ViewField/Text/View';
import { WARRANTY_PERIOD_OPTIONS } from '@base/config/constant';

interface Props extends CommonViewProps {
  value: any;
}

const View = (props: Props) => {
  const { value } = props;

  const valueString = useMemo(() => {
    const valueString = value?.period ?? '';
    if (!valueString) {
      return '';
    }
    const option = value?.unit || '';
    const optionItem = WARRANTY_PERIOD_OPTIONS.find((element: any) => element.value == option);
    return `${valueString} ${optionItem?.label || ''}`;
  }, [value?.unit, value?.period]);

  return <TextView value={valueString} />;
};

export default View;
