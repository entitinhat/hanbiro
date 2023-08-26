import React from 'react';
import Classification from '@desk/ticket/containers/WriteFields/ClassificationWriteField/ClassificationWriteFieldV2';
import { ClassifficationValue } from '@desk/ticket/types/classification';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

interface EditProps extends CommonEditProps {
  value?: ClassifficationValue[];
  onChange?: (val: ClassifficationValue[]) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit: React.FC<EditProps> = (props: EditProps) => {
  const { value, componentProps, onChange } = props;
  return <Classification {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
