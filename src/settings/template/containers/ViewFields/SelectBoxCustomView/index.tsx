import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import View from './View';
import Edit from './Edit';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

interface SelectBoxCustomProps extends CommonViewFieldProps {}

const SelectBoxCustomViewField = (props: SelectBoxCustomProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default SelectBoxCustomViewField;
