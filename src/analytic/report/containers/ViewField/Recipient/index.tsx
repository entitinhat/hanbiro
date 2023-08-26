import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

interface RecipientProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const Recipient: React.FC<RecipientProps> = (props: RecipientProps) => {
  const { onSave, value, menuSourceId, menuSource, keyName, ...remainProps } = props;
  return (
    <CommonViewField
      keyName={keyName}
      menuSourceId={menuSourceId}
      menuSource={menuSource}
      {...remainProps}
      onSave={onSave}
      componentView={View}
      componentEdit={Edit}
      value={value}
    />
  );
};

export default Recipient;
