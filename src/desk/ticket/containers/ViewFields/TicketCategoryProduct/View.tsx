import React from 'react';
import TextView from '@base/containers/ViewField/Text/View';
import { ValueProps } from '@desk/ticket/containers/ProductCategory';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

interface ViewProps extends CommonViewProps {
  value: ValueProps;
}

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value } = props;
  const { product, category } = value;
  return <TextView value={product ? `${product?.name || ''} / ${category?.name || ''}` : ''} />;
};

export default View;
