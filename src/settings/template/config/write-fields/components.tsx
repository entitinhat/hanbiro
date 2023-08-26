import { lazy } from 'react';

export const SelectBoxCustom = lazy(() => import('@base/components/@hanbiro/SelectBoxCustom'));
export const LanguageSelect = lazy(() => import('@base/components/@hanbiro/LangSelect'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const DomEditor = lazy(() => import('@base/components/@hanbiro/DomEditor'));
export const SequenceTaskContainer = lazy(() => import('@settings/template/containers/SequenceTaskForm'));
export const GrapesTS = lazy(() => import('@base/components/@hanbiro/GrapeTS'));
export const SiteTemplateSelect = lazy(() => import('@settings/template/containers/SiteTemplateSelect'));
export const OnetimeTable = lazy(() => import('@settings/template/quote/containers/OnetimeTable'));