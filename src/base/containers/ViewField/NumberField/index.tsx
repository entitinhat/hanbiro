import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';
import _ from 'lodash';

interface ViewFieldProps extends CommonViewFieldProps {
  value: any;
}

const NumberViewField = (props: ViewFieldProps) => {
  const { value, keyName, config, menuSource } = props;

  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }

  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default NumberViewField;
