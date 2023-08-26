import { lazy } from 'react';

export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const ProductView = lazy(() => import('@product/product/containers/ViewFields/Product'));
