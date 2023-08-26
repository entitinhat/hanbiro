import { lazy } from 'react';

export const AssignmentGroup = lazy(() => import('@analytic/report/containers/ViewField/AssignmentGroup'));
export const Owner = lazy(() => import('@analytic/report/containers/ViewField/Owner'));
export const Recipient = lazy(() => import('@analytic/report/containers/ViewField/Recipient'));
export const ReportingCycle = lazy(() => import('@analytic/report/containers/ViewField/ReportingCycle'));
export const ReportingContent = lazy(() => import('@analytic/report/containers/ViewField/ReportingContent'));
export const DateRange = lazy(()=>import('@analytic/report/containers/ViewField/DateRange'))