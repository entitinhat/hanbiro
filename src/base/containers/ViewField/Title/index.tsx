import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '../Common/interface';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

interface TitleProps extends CommonViewFieldProps {
  value: string;
}

const Title = (props: TitleProps) => {
  return <CommonViewField isHorizontal={true} {...props} componentView={View} componentEdit={Edit} />;
};

export default Title;
