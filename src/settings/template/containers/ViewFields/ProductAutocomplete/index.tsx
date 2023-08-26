import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import View from './View';
const Edit = lazy(() => import('@product/product/containers/ProductAutoComplete'));
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';


interface ProductProps extends CommonViewFieldProps {}

const ProductViewField = (props: ProductProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default ProductViewField;