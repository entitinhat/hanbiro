import React from 'react';
import { CustomerQuickView as TextView } from '@base/containers/QuickView';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import { ValueProps } from '@customer/containers/CustomerContact';
interface ViewProps extends CommonViewFieldProps {
  value: ValueProps;
}

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value } = props;
  const customerName: IdName = {
    id: value?.customer?.id ?? '',
    name: value?.customer?.name ?? ''
  };
  return <TextView value={customerName} />;
};

export default View;
