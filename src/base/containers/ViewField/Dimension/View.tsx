import React, { useEffect, useMemo, useState } from 'react';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import TextView from '@base/containers/ViewField/Text/View';
import { DIMENSION_UNIT_OPTIONS } from '@base/config/constant';

interface Props extends CommonViewProps {
  value: any;
}

const View = (props: Props) => {
  const { value } = props;

  const valString = value?.val
    ? `${value?.val?.x} x ${value?.val?.y} x ${value?.val?.z} ${DIMENSION_UNIT_OPTIONS?.find((v: any) => v.value == value?.unit)?.label}`
    : '';

  return <TextView value={valString} />;
};

export default View;
