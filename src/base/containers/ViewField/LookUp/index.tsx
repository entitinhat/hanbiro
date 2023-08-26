import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';
// import { useRecoilValue } from 'recoil';
// import { viewDataByMenuAtom } from '@base/store/atoms';
// import { getFieldLayoutDataByKeyName, parseLookupAttrToConfig } from '@base/utils/helpers/pageLayoutUtils';

import View from './View';
import Edit from './Edit';
import _ from 'lodash';

interface LookUpProps extends CommonViewFieldProps {
  value: any;
}

const LookUpViewField = (props: LookUpProps) => {
  const { value, keyName, config, menuSource } = props;

  // const viewData = useRecoilValue(viewDataByMenuAtom(menuSource));
  // const field = getFieldLayoutDataByKeyName(viewData, keyName);
  // let lookUpProps = null;
  // if (field) {
  //   lookUpProps = parseLookupAttrToConfig(field);
  // }

  let viewProps = _.cloneDeep(config?.componentProps);
  let newConfig = _.cloneDeep(config);
  if (newConfig) {
    newConfig.viewProps = viewProps;
  }

  return <CommonViewField {...props} config={newConfig} componentView={View} componentEdit={Edit} />;
};

export default LookUpViewField;
