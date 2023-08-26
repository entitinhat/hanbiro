import { lazy } from 'react';

export const FromUserView = lazy(() => import('@activity/components/FromUser'));
export const ToCustomerView = lazy(() => import('@activity/components/ToCustomer'));
// export const PurposeView = lazy(() => import('@activity/components/purpose'));
// export const CallResultView = lazy(() => import('@activity/components/call-result'));
export const StatusView = lazy(() => import('@activity/containers/ViewFields/StatusViewField'));
export const ChecklistView = lazy(() => import('@activity/containers/Checklist/View'));
export const TaskSequenceView = lazy(() => import('@activity/containers/Sequence/View'));
export const ProductViewField = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const RelatedToViewField = lazy(() => import('@activity/containers/ViewFields/RelatedWorkViewField'));
export const TagsViewField = lazy(() => import('@desk/knowledge-base/containers/ViewFields/Tags'));
