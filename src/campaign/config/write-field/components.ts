import { lazy } from 'react';

export const ImageUpload = lazy(() => import('@base/components/@hanbiro/ImageUpload'));
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const ProcessAutoComplete = lazy(() => import('@base/containers/LookUp'));
export const SendSchedule = lazy(() => import('@campaign/components/SendSchedule'));
export const Sender = lazy(() => import('@campaign/components/Sender'));
export const KeyPerformanceIndicator = lazy(() => import('@campaign/components/KPI'));
export const ReplyTo = lazy(() => import('@campaign/components/ReplyTo'));
export const Expenses = lazy(() => import('@campaign/components/Expenses'));
export const ContentEditor = lazy(() => import('@campaign/components/ContentEditor'));
