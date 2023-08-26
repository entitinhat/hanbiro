import React, { lazy, useEffect, useState } from 'react';
import _ from 'lodash';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

interface ViewFieldProps extends CommonViewFieldProps {
  value: any;
}

const CustomerAddressView = (props: ViewFieldProps) => {
  const { value, keyName, config, menuSource } = props;

  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }

  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default CustomerAddressView;
