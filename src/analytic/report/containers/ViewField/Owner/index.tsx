import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
const View = lazy(() => import('./View'));

interface OwnerProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const Owner: React.FC<OwnerProps> = (props: OwnerProps) => {
  const { onSave, value, menuSourceId, menuSource, keyName, ...remainProps } = props;
  return (
    <CommonViewField
      keyName={keyName}
      menuSourceId={menuSourceId}
      menuSource={menuSource}
      {...remainProps}
      onSave={onSave}
      componentView={View}
      componentEdit={null}
      value={value}
    />
  );
};

export default Owner;
