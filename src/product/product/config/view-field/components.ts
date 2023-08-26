import { lazy } from 'react';

export const ProductGroupView = lazy(() => import('@product/group/containers/ViewField/ProductGroup'));
export const BaseUnitView = lazy(() => import('@product/unit/containers/ViewField/BaseUnit'));
export const AttributeView = lazy(() => import('@product/product/containers/ViewFields/Attribute'));
