import { lazy } from 'react';

export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const ItemAutoComplete = lazy(() => import('@product/item/containers/ItemAutoComplete'));
export const AmountRangeSlider = lazy(() => import('@quote/components/AmountRangeSlider'));
export const QuoteItems = lazy(() => import('@quote/containers/QuoteItems'));
export const TermCondition = lazy(() => import('@quote/containers/TermCondition'));
export const SelectTemplate = lazy(() => import('@base/containers/ViewField/SelectTemplate'));
export const DigitalContentTable = lazy(() => import('@quote/containers/DigitalContentTable'));
export const OpportunityAutoComplete = lazy(() => import('@opportunity/containers/OpportunityAutoComplete'));
