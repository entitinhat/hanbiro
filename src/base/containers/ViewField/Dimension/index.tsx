import React, { lazy, useEffect, useState } from 'react';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

interface DimensionProps extends CommonViewFieldProps {}

const DimensionViewField = (props: DimensionProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default DimensionViewField;
