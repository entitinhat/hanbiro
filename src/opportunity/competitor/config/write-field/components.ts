import { lazy } from 'react';

export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const ItemAutoComplete = lazy(() => import('@product/item/containers/ItemAutoComplete'));
