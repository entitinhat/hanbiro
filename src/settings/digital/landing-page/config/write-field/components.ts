import { lazy } from 'react';

export const ImageUpload = lazy(() => import('@base/components/@hanbiro/ImageUpload'));
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const SiteTemplateSelect = lazy(() => import('@settings/template/containers/SiteTemplateSelect'));
export const GrapesTS = lazy(() => import('@base/components/@hanbiro/GrapeTS'));
export const SelectBoxCustom = lazy(() => import('@base/components/@hanbiro/SelectBoxCustom'));
export const LanguageSelect = lazy(() => import('@base/components/@hanbiro/LangSelect'));
export const DomEditor = lazy(() => import('@base/components/@hanbiro/DomEditor'));
export const SequenceTaskContainer = lazy(() => import('@settings/template/containers/SequenceTaskForm'));
export const TextArea = lazy(() => import('@base/containers/ViewField/TextArea/Edit'));
