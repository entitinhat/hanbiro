import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { OptionValue } from '@base/types/common';
import React from 'react';
import LinkUrl from '@base/containers/LinkUrl';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (params: any) => {};
}

const Edit = (props: EditProps) => {
  const { value, componentProps, onChange } = props;

  return <LinkUrl {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
