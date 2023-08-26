import { lazy } from 'react';

export const LanguageSelect = lazy(() => import('@base/components/@hanbiro/LangSelect'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const SelectBoxCustomViewField = lazy(() => import('@settings/template/containers/SiteTemplateSelect'));
export const GrapesTS = lazy(() => import('@base/components/@hanbiro/GrapeTS'));
export const FormTemplateSelect = lazy(() => import('@settings/digital/ticket-form/containers/FormTemplateSelect'));
