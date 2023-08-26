import React, { Consumer } from 'react';

import LookUp from '@base/containers/LookUp';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <LookUp value={value} onChange={onChange} {...componentProps} fetchList={componentProps?.fetchList} />;
};

export default Edit;
