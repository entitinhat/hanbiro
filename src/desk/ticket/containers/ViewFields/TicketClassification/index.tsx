import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import React, { lazy } from 'react';
const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));
interface TicketClassificationViewProps extends CommonViewFieldProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const TicketClassificationView: React.FC<TicketClassificationViewProps> = (props: TicketClassificationViewProps) => {
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

export default TicketClassificationView;
