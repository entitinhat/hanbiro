import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';
import _ from 'lodash';

interface ViewFieldProps extends CommonViewFieldProps {
  value: any;
}

const EmailInputViewField = (props: ViewFieldProps) => {
  const { value, keyName, config, menuSource } = props;

  console.log('email value', value);
  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }

  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default EmailInputViewField;
