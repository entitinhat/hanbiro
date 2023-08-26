import { lazy } from 'react';

export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const ProductView = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const SendScheduleView = lazy(() => import('@campaign/containers/ViewFields/SendSchedule'));
export const KpiView = lazy(() => import('@campaign/containers/ViewFields/KPI'));
export const SenderView = lazy(() => import('@campaign/containers/ViewFields/Sender'));
export const ReplyToView = lazy(() => import('@campaign/containers/ViewFields/ReplyTo'));
export const ExpensesView = lazy(() => import('@campaign/containers/ViewFields/Expenses'));
