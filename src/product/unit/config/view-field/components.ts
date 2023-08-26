import { lazy } from 'react';

export const ProductView = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const RelateProductViewField = lazy(() => import('@product/unit/containers/ViewField/RelateProductView'));
