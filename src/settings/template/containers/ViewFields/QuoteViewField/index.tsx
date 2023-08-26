import React from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import View from './View';
import Edit from './Edit';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

interface QuoteViewFieldProps extends CommonViewFieldProps {
  viewConfig:any
}

const QuoteViewField = (props: QuoteViewFieldProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default QuoteViewField;
