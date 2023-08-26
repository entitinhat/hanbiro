import React, { useEffect, useState } from 'react';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import TextView from '@base/containers/ViewField/Text/View';

interface Props extends CommonViewProps {
  value: IdName;
}

const View = (props: Props) => {
  const { value } = props;

  return <TextView value={value?.name ?? ''} />;
};

export default View;
