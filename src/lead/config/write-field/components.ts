import { lazy } from 'react';

export const PhoneInput = lazy(() => import('@lead/containers/WriteFields/Phone'));
export const EmailInput = lazy(() => import('@lead/containers/WriteFields/EmailInput'));
export const AddressInput = lazy(() => import('@lead/containers/WriteFields/AddressInput'));
export const WebsiteInput = lazy(() => import('@lead/containers/WriteFields/WebsiteInput'));

export const TextArea = lazy(() => import('@base/containers/ViewField/TextArea/Edit'));
export const LeadSettingSelect = lazy(() => import('@lead/containers/SettingSelect'));
