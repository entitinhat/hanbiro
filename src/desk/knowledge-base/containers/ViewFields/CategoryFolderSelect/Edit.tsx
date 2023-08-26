import React from 'react';
import KBCategoryAutoComplete from '@desk/knowledge-base/containers/KBCategoryAutoComplete';

const Edit: React.FC = (props: any) => {
  const { value, errors, componentProps, onChange } = props;
  //// console.log('props edit', props);

  return <KBCategoryAutoComplete {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
