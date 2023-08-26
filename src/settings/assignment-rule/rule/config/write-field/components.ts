import { lazy } from 'react';

//related modules
export const SelectBoxCustom = lazy(() => import('@base/components/@hanbiro/SelectBoxCustom'));
export const TextArea = lazy(() => import('@base/containers/ViewField/TextArea/Edit'));
export const RuleCriteria = lazy(() => import('@settings/assignment-rule/rule/containers/RuleCriteriaSelect'));
export const ChannelAutoComplete = lazy(() => import('@settings/assignment-rule/rule/containers/ChannelAutoComplete'));
export const AssignTo = lazy(() => import('@settings/assignment-rule/rule/containers/AssignTo'));
export const ModulePicker = lazy(() => import('@settings/assignment-rule/rule/containers/ModulePicker'));
