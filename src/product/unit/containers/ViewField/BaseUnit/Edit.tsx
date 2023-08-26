import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import BaseUnitAutoComplete from '@product/unit/containers/BaseUnitAutoComplete';

interface EditProps extends CommonEditProps {
  value: IdName;
  onChange: (params?: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <BaseUnitAutoComplete value={value} onChange={onChange} />;
};

export default Edit;
