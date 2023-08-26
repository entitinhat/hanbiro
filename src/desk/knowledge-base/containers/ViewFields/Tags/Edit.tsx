import React, { Consumer } from 'react';

import Tags from './Tags';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import HanButtonGroup from '@base/components/@hanbiro/HanButtonGroup';

interface EditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps: any;
  onClose?: () => void;
  onSave?: () => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps, onSave, onClose } = props;
  return (
    <>
      <Tags value={value} onChange={onChange} {...componentProps} open={open} />
      <HanButtonGroup onSave={() => onSave && onSave()} onClose={() => onClose && onClose()} />
    </>
  );
};

export default Edit;
