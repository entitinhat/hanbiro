import { lazy } from 'react';

export const ProductAutoComplete = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const LanguageSelect = lazy(() => import('@base/containers/ViewField/LanguageSelect'));
export const DescriptionView = lazy(() => import('@base/containers/ViewField/TextArea'));
export const SubmissionSetting = lazy(() => import('@settings/digital/ticket-form/containers/ViewFields/SubmissionSetting'));
export const SubmissionBehavior = lazy(() => import('@settings/digital/ticket-form/containers/ViewFields/SubmissionBehavior'));
