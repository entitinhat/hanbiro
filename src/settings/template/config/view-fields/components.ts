import { lazy } from 'react';

export const ProductViewField = lazy(() => import('@settings/template/containers/ViewFields/ProductAutocomplete'));
export const SelectBoxCustomViewField = lazy(() => import('@settings/template/containers/ViewFields/SelectBoxCustomView'));
export const LanguageSelectViewField = lazy(() => import('@base/containers/ViewField/LanguageSelect'));
export const AssignRepViewField = lazy(() => import('@settings/template/containers/ViewFields/AssignRepAutocomplete'));
export const StageViewField = lazy(() => import('@settings/template/containers/ViewFields/StageView'));
export const SequenceFormView = lazy(() => import('@settings/template/containers/ViewFields/SequenceFormView'));
export const GrapesTSViewField = lazy(() => import('@base/containers/ViewField/GrapeTS'));
export const QuoteViewField = lazy(() => import('@settings/template/containers/ViewFields/QuoteViewField'));
