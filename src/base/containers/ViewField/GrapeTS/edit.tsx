import React, { useEffect, useState } from 'react';
import GrapesTS from '@base/components/@hanbiro/GrapeTS';

const Edit: React.FC = (props: any) => {
  const { value, onChange, componentProps } = props;
  console.log(`~~~~GrapesJS View Field Edit props`, props);
  return (
    <GrapesTS
      isFullScreen={false}
      height={'calc(100vh - 290px)'}
      storageId={'grapes-ts-view-gts'}
      value={value}
      onChange={onChange}
      templateType={componentProps?.templateType}
    />
  );
};

export default Edit;
