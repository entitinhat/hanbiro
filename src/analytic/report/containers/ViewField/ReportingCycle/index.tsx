import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
const View = lazy(() => import('./View'));
const Edit = lazy(() => import('@analytic/report/containers/FormReportingCycle'));

interface ReportingCycleProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}

const ReportingCycle: React.FC<ReportingCycleProps> = (props: ReportingCycleProps) => {
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

export default ReportingCycle;
