import { lazy } from 'react';

// export const TaskSequence = lazy(() => import('@activity/components/sequence'));
// export const TaskSequence = lazy(() => import('@activity/containers/sequence-form'));
// export const TaskChecklist = lazy(() => import('@activity/components/checklist'));
// export const TaskChecklist = lazy(() => import('@activity/containers/checklist-form/edit'));
// export const TaskSequence = lazy(() => import('@activity/containers/task-sequence'));
// export const TaskChecklist = lazy(() => import('@activity/containers/task-checklist'));
// export const RelatedTo = lazy(() => import('@activity/components/related-to'));
// export const CustomerUser = lazy(() => import('@activity/components/customer-user'));
// export const ToCustomer = lazy(() => import('@activity/components/to-customer/edit'));
// export const FromUser = lazy(() => import('@activity/components/from-user/edit'));
// export const ShowMailCc = lazy(() => import('@activity/components/show-mail-cc'));
// export const KnowledgeBaseInserted = lazy(
//   () => import('@desk/knowledge-base/components/knowledge-base-inserted'),
// );

//current modules
export const TaskChecklist = lazy(() => import('@activity/containers/Checklist'));
export const TaskSequence = lazy(() => import('@activity/containers/Sequence'));
export const FromUser = lazy(() => import('@activity/components/FromUser/Edit'));
export const ToCustomer = lazy(() => import('@activity/components/ToCustomer/Edit'));
export const ShowMailCc = lazy(() => import('@activity/components/ShowMailCc'));
export const RelatedItem = lazy(() => import('@activity/containers/RelatedItem'));
//related modules
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const KBAutoComplete = lazy(() => import('@desk/knowledge-base/containers/KBAutoComplete'));
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
export const SelectBoxCustom = lazy(() => import('@base/components/@hanbiro/SelectBoxCustom'));
export const LookupCustom = lazy(() => import('@activity/containers/LookupCustom/LookupCustom'));

export const DurationRangeCustom = lazy(() => import('@activity/containers/DurationRange'));
export const Tags = lazy(() => import('@desk/knowledge-base/containers/ViewFields/Tags/Tags'));
