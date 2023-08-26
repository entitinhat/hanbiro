import { lazy } from 'react';

export const ProductView = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const SkuView = lazy(() => import('@product/item/containers/ViewFields/Sku'));
export const AttrValuesView = lazy(() => import('@product/item/containers/ViewFields/AttrValues'));