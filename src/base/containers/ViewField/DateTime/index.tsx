import React, { lazy, useEffect, useState } from 'react';
import _ from 'lodash';

import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';

interface DateTiemProps extends CommonViewFieldProps {}

const DateTimeViewField = (props: DateTiemProps) => {
  const { config } = props;

  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }

  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default DateTimeViewField;
