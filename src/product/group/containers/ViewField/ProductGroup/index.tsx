import React, { lazy, useEffect, useState } from 'react';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

interface ProductGroupProps extends CommonViewFieldProps {}

const ProductGroupViewField = (props: ProductGroupProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default ProductGroupViewField;
