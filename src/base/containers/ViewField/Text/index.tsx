import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';

interface TextProps extends CommonViewFieldProps {}

const TextViewField = (props: TextProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default TextViewField;
