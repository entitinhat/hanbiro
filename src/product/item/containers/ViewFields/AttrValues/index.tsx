import React, { lazy, useEffect, useState } from 'react';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
// import Edit from './Edit';

interface AttrValuesProps extends CommonViewFieldProps {}

const AttrValuesViewField = (props: AttrValuesProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={null} />;
};

export default AttrValuesViewField;
