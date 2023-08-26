import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

const LinkUrlViewField: React.FC = (props: any) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default LinkUrlViewField;
