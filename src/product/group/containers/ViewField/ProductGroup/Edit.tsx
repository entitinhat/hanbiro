import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';

interface EditProps extends CommonEditProps {
  value: IdName;
  onChange: (params?: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <ProductGroupAutoComplete value={value} onChange={onChange} />;
};

export default Edit;
