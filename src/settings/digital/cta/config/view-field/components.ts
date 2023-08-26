import { lazy } from 'react';

export const LanguageSelectView = lazy(() => import('@base/containers/ViewField/LanguageSelect'));
export const LinkUrlView = lazy(() => import('@base/containers/ViewField/LinkUrl'));
export const SelectBoxView = lazy(() => import('@base/containers/ViewField/SelectBox'));
export const InputColorView = lazy(() => import('@base/containers/ViewField/InputColor'));
export const ImageSizeView = lazy(() => import('@base/containers/ViewField/ImageSize'));
export const SliderView = lazy(() => import('@settings/digital/cta/containers/ViewFields/Slider'));
export const LandingPageView = lazy(() => import('@settings/digital/landing-page/containers/ViewFields/LandingPage'));
export const SiteView = lazy(() => import('@settings/site/containers/ViewFields/Site'));
export const SurveyView = lazy(() => import('@settings/digital/survey/containers/ViewFields/Survey'));
