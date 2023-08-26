import { lazy } from 'react';

export const Classification = lazy(() => import('@desk/ticket/containers/WriteFields/ClassificationWriteField/ClassificationWriteFieldV2'));
//related modules
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const ProductCategorySelect = lazy(() => import('@desk/ticket/containers/ProductCategory'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const PrioritySelect = lazy(() => import('@base/containers/PrioritySelect'));
export const AssignGroupRep = lazy(() => import('@desk/ticket/containers/AssignGroupRep'));
export const AssignGroupAutocomplete = lazy(() => import('@settings/preferences/containers/AssignGroupAutocomplete'));
export const AssignRepAutocomplete = lazy(() => import('@settings/preferences/containers/AssignUserAutocomplete'));
export const ProcessAutoComplete = lazy(() => import('@base/containers/LookUp'));
export const Tags = lazy(() => import('@desk/knowledge-base/containers/ViewFields/Tags/Tags'));
export const CategoryAutoComplete = lazy(() => import('@base/containers/LookUp'));
export const ChannelAutoComplete = lazy(() => import('@base/containers/LookUp'));
export const CategorySelect = lazy(() => import('@desk/ticket/containers/CategorySelect'));
