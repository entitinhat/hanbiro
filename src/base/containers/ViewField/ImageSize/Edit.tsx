import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { useState } from 'react';
import CtaImageSize from '@base/containers/ImageSize';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (data: any) => {};
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  return (
    <>
      <CtaImageSize {...componentProps} flexWrap="wrap" value={value} onChange={onChange} />
    </>
  );
};

export default Edit;
