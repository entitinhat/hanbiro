import { lazy } from 'react';

export const CustomerContactView = lazy(() => import('@desk/ticket/containers/ViewFields/CustomerContact'));

export const CategoryProductView = lazy(() => import('@desk/ticket/containers/ViewFields/TicketCategoryProduct'));

export const ChannelView = lazy(() => import('@desk/ticket/containers/ViewFields/ChannelView'));
export const AssignRep = lazy(() => import('@desk/ticket/containers/ViewFields/AssignRep'));

export const TicketClassificationView = lazy(() => import('@desk/ticket/containers/ViewFields/TicketClassification'));

export const AssignGroupRepView = lazy(() => import('@desk/ticket/containers/ViewFields/AssignGroupRep'));
export const AssignGroupView = lazy(() => import('@desk/ticket/containers/ViewFields/AssignGroup'));

export const CcUsersView = lazy(() => import('@desk/ticket/containers/ViewFields/CcUsersView'));
export const FirstRespondDueView = lazy(() => import('@desk/ticket/containers/ViewFields/FirstResponseDue'));
export const ResolutionDueView = lazy(() => import('@desk/ticket/containers/ViewFields/ResolutionDue'));
export const DateTimeViewNormal = lazy(() => import('@desk/ticket/containers/ViewFields/DateTimeViewNormal'));

export const Tags = lazy(() => import('@desk/knowledge-base/containers/ViewFields/Tags'));
