import React, { lazy, useEffect, useState } from 'react';

import { Repeat } from '@base/components/@hanbiro/RepeatTime';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

interface RepeatTimeProps extends CommonViewFieldProps {
  value: Repeat;
}

const RepeatTimeViewField = (props: RepeatTimeProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default RepeatTimeViewField;
