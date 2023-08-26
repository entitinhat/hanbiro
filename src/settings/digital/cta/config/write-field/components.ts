import { lazy } from 'react';

export const SelectBox = lazy(() => import('@base/components/@hanbiro/SelectBox'));
export const LanguageSelect = lazy(() => import('@base/components/@hanbiro/LangSelect'));
export const Switch = lazy(() => import('@base/containers/ViewField/Switch/Edit'));
export const TextArea = lazy(() => import('@base/containers/ViewField/TextArea/Edit'));
export const Text = lazy(() => import('@base/containers/ViewField/Text/Edit'));
export const CtaPreview = lazy(() => import('@settings/digital/cta/components/CtaPreview'));
export const CtaImageSize = lazy(() => import('@base/containers/ImageSize'));
export const CtaImageUploadSample = lazy(() => import('@settings/digital/cta/components/CtaImageUploadSample'));
export const LandingPageAutocomplete = lazy(() => import('@settings/digital/landing-page/containers/LandingPageAutocomplete'));
export const SurveyAutocomplete = lazy(() => import('@settings/digital/survey/containers/SurveyAutocomplete'));
export const SiteAutocomplete = lazy(() => import('@settings/site/containers/SiteAutocomplete'));
export const Website = lazy(() => import('@settings/digital/cta/containers/WriteFields/WebsiteInput'));
