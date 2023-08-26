import CommonViewField from '@base/containers/ViewField/Common';
import React, { lazy } from 'react';
const View = lazy(() => import('./View'));
interface ResolutionDueProps {
  value: string;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const DateTimeViewNormal = (props: ResolutionDueProps) => {
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

export default DateTimeViewNormal;
