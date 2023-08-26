import React from 'react';

import { CommonViewFieldProps } from '../Common/interface';
import TagInput from '@base/components/@hanbiro/TagInput';

interface EditProps extends CommonViewFieldProps {
  value: string[];
  onChange: (val: string[]) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <TagInput value={value ?? []} onChange={onChange} />;
};

export default Edit;
