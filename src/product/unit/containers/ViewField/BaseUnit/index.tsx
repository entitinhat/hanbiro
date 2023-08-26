import React, { lazy, useEffect, useState } from 'react';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

interface BaseUnitProps extends CommonViewFieldProps {}

const BaseUnitViewField = (props: BaseUnitProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default BaseUnitViewField;
