import React from 'react';

import RepeatTime, { Repeat } from '@base/components/@hanbiro/RepeatTime';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

interface EditProps extends CommonEditProps {
  value: Repeat;
  onChange: (params: Repeat) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <RepeatTime value={value} onChange={onChange} />;
};

export default Edit;
