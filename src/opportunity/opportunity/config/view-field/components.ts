import { lazy } from 'react';

export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const ProductView = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const CustomerViewName = lazy(() => import('@opportunity/containers/CustomerViewName'));
export const WinProbabilityView = lazy(() => import('@opportunity/containers/ViewField/WinProbabilityView'));
export const SalesRepView = lazy(() => import('@opportunity/containers/ViewField/SalesRepView'));
export const CollectionMethodView = lazy(() => import('@opportunity/containers/ViewField/CollectionMethodView'));
export const LeadPreferredView = lazy(() => import('@opportunity/containers/ViewField/LeadPreferredView'));
export const CompetitorAutoComplete = lazy(() => import('@opportunity/containers/ViewField/CompetitorAutoComplete'));
