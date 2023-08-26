import { lazy } from 'react';

export const ActionWrite = lazy(() => import('@process/components/Diagram/Action/ActionWrite'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const StatusWrite = lazy(() => import('@process/components/Diagram/Status/StatusWrite'));
export const SwitchWrite = lazy(() => import('@base/containers/ViewField/Switch/Edit'));
export const ChecklistWrite = lazy(() => import('@process/components/Diagram/Checklist/ChecklistWrite'));
export const CriteriaWrite = lazy(() => import('@process/components/Diagram/Criteria/CriteriaWrite'));
export const CriteriaAutomation = lazy(() => import('@process/components/Automation/Criteria/CriteriaAutomation'));
export const TriggerAutomation = lazy(() => import('@process/components/Automation/Trigger/TriggerAutomation'));
export const FieldValue = lazy(() => import('@process/components/FieldValue'));

export const WaitWrite = lazy(() => import('@process/components/Diagram/Wait/WaitWrite'));
export const SiteWrite = lazy(() => import('@process/components/Diagram/Site/SiteWrite'));
export const AutomationWrite = lazy(() => import('@process/components/Diagram/Automation/AutomationWrite'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const TriggerSettingWrite = lazy(() => import('@process/components/Trigger/TriggerWrite'));
export const ActionSettingWrite = lazy(() => import('@process/components/Action/ActionWrite'));
export const CriteriaSettingWrite = lazy(() => import('@process/components/Criteria/CriteriaWrite'));
