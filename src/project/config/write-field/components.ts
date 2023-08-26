import { lazy } from 'react';

export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const MemberWrite = lazy(() => import('@project/components/Member'));
export const BusinessProcessWrite = lazy(() => import('@project/components/BusinessProcess'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const DropdownTree = lazy(() => import('@base/components/@hanbiro/DropdownTree/Text'));
export const LinkWrite = lazy(() => import('@project/components/Link'));
export const FinishingQAWrite = lazy(() => import('@project/components/FinishingQA'));
export const AttachmentWrite = lazy(() => import('@base/containers/Attachments'));
export const SettingBoxWrite = lazy(() => import('@project/components/SettingBox/Edit'));
export const TemplateBoxWrite = lazy(() => import('@project/components/TemplateBox'));
export const S3UploadFilesWrite = lazy(() => import('@base/containers/S3UploadFiles'));
