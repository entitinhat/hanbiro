import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import Weight from '@base/components/@hanbiro/Weight';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (params?: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <Weight value={value} onChange={onChange} />;
};

export default Edit;
