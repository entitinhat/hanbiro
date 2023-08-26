import React, { useMemo, useState } from 'react';

import PrioritySelect from '@base/containers/PrioritySelect';
import { Selection } from '@settings/general/types/interface';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: Selection;
  onChange: (params: any) => {};
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <PrioritySelect value={value} onChange={onChange} />;
};

export default Edit;
