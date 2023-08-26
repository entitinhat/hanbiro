
import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import View from './View';
import Edit from './Edit';

interface TextProps extends CommonViewFieldProps {}

const PrioritizeName = (props: TextProps) => {
    const { value } = props;
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default PrioritizeName;


