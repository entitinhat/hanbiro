import { lazy } from 'react';

export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const ItemAutoComplete = lazy(() => import('@product/item/containers/ItemAutoComplete'));
export const CustomerField = lazy(() => import('@opportunity/containers/CustomerField'));
export const OpportunityType = lazy(() => import('@opportunity/components/OpportunityType'));
export const CustomerReferrer = lazy(() => import('@opportunity/components/CustomerReferrer'));
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const CompetitorAutoComplete = lazy(() => import('@competitor/containers/CompetitorAutoComplete'));
