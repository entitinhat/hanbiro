import { lazy } from 'react';

export const CriteriaAutomationView = lazy(() => import('@process/components/Automation/Criteria'));
export const TriggerAutomationView = lazy(() => import('@process/components/Automation/Trigger'));
export const TriggerView = lazy(() => import('@process/components/Trigger'));
export const ActionView = lazy(() => import('@process/components/Action'));
export const CriteriaView = lazy(() => import('@process/components/Criteria'));
export const DiagramActionView = lazy(() => import('@process/components/Diagram/Action'));
export const DiagramSiteView = lazy(() => import('@process/components/Diagram/Site'));
export const DiagramWaitView = lazy(() => import('@process/components/Diagram/Wait'));
export const DiagramCriteriaView = lazy(() => import('@process/components/Diagram/Criteria'));
export const DiagramChecklistView = lazy(() => import('@process/components/Diagram/Checklist'));
export const DiagramAutomationView = lazy(() => import('@process/components/Diagram/Automation'));
export const DiagramStatusView = lazy(() => import('@process/components/Diagram/Status'));



