import { lazy } from 'react';

export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const TextView = lazy(() => import('@base/containers/ViewField/Text'));
export const DateTimeViewField = lazy(() => import('@base/containers/ViewField/DateTime'));
export const LanguageSelectViewField = lazy(() => import('@base/containers/ViewField/LanguageSelect'));
export const SelectBoxView = lazy(() => import('@base/containers/ViewField/SelectBox'));
export const ProductViewField = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const PublishDateView = lazy(() => import('@settings/digital/landing-page/containers/ViewFields/PublishDate'));
export const PublishView = lazy(() => import('@settings/digital/landing-page/containers/ViewFields/Publish'));
export const TextArea = lazy(() => import('@base/containers/ViewField/TextArea'));
export const ChannelsView = lazy(() => import('@settings/digital/landing-page/containers/ViewFields/Channels'));
