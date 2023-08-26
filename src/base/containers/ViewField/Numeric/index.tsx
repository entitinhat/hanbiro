import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';
import _ from 'lodash';

interface ViewFieldProps extends CommonViewFieldProps {
  value: string | number;
}

const NumericViewField = (props: ViewFieldProps) => {
  const { value, config } = props;

  let viewProps = _.cloneDeep({ ...config?.componentProps });
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = { ...viewProps, displayType: 'text' };
  }

  return <CommonViewField {...props} config={newConfig} value={value.toString()} componentView={View} componentEdit={Edit} />;
};

export default NumericViewField;
