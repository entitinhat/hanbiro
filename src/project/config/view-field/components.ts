import { lazy } from 'react';

export const CustomerAutoCompleteView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const DateTimeView = lazy(() => import('@base/containers/ViewField/DateTime'));
export const SettingBoxView = lazy(() => import('@project/components/SettingBox'));
export const LinkView = lazy(() => import('@project/components/Link'));
export const FinishingQAView = lazy(() => import('@project/components/FinishingQA'));
