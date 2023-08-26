import React, { lazy, useEffect, useState } from 'react';

import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';
import { Repeat } from '@base/components/@hanbiro/RepeatTime';

import View from './View';
import Edit from './Edit';

interface RepeatTimeProps extends CommonViewFieldProps {
  value: Repeat;
}

const RepeatTimeViewField = (props: RepeatTimeProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default RepeatTimeViewField;
