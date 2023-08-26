import CommonViewField from '@base/containers/ViewField/Common';
import React, { lazy } from 'react';
const View = lazy(() => import('./View'));
interface FirstRespondDueProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const FirstRespondDue = (props: FirstRespondDueProps) => {
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

export default FirstRespondDue;
