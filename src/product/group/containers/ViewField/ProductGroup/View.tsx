import React, { useEffect, useState } from 'react';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import { ProductGroupQuickView } from '@base/containers/QuickView/Product';

interface Props extends CommonViewProps {
  value: IdName;
}

const View = (props: Props) => {
  const { value } = props;

  return <ProductGroupQuickView value={value} />;
};

export default View;
