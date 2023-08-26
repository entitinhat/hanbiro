//import React, { lazy, useEffect, useState } from 'react';

//third-party
import _ from 'lodash';

//project
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

//local
import View from './View';
import Edit from './Edit';

interface ViewFieldProps extends CommonViewFieldProps {
  value: any;
}

const KpiViewField = (props: ViewFieldProps) => {
  const { config } = props;

  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }

  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default KpiViewField;
