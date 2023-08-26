import { lazy } from 'react';

export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const AssignmentGroup = lazy(()=> import('@analytic/report/containers/FormAssignmentGroup'))
export const ReportingCycle = lazy(()=> import('@analytic/report/containers/FormReportingCycle'))
export const ReportingContent = lazy(()=> import('@analytic/report/containers/ReportingContent'))
export const DateRangeSelectBox = lazy(()=> import('@analytic/report/containers/DateRangeSelectBox'))