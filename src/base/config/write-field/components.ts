import { lazy } from 'react';

//base
export const MuiRadioGroup = lazy(() => import('@base/components/@hanbiro/RadioGroup'));
export const MuiCheckbox = lazy(() => import('@base/components/@hanbiro/MuiCheckbox'));
export const DatePicker = lazy(() => import('@base/components/@hanbiro/Date/DatePicker'));
export const DateTimePicker = lazy(() => import('@base/components/@hanbiro/Date/DateTimePicker'));
export const DateTimePicker2 = lazy(() => import('@base/components/@hanbiro/Date/DateTimePicker2'));
export const DateRangePicker = lazy(() => import('@base/components/@hanbiro/Date/DateRangePicker'));
export const SelectBox = lazy(() => import('@base/components/@hanbiro/SelectBox'));
export const TemplateSelect = lazy(() => import('@base/containers/ViewField/SelectTemplate'));
export const RepeatTime = lazy(() => import('@base/components/@hanbiro/RepeatTime'));
export const Duration = lazy(() => import('@base/components/@hanbiro/Duration'));
export const DurationSelect = lazy(() => import('@base/components/@hanbiro/DurationSelect'));
export const Reminder = lazy(() => import('@base/components/@hanbiro/Reminder'));
export const TagInput = lazy(() => import('@base/components/@hanbiro/TagInput'));
export const TuiEditor = lazy(() => import('@base/components/@hanbiro/TuiEditor'));
export const SingleFileUpload = lazy(() => import('@base/components/@hanbiro/FileUpload/SingleFile'));
export const MultiFileUpload = lazy(() => import('@base/components/@hanbiro/FileUpload/MultiFile'));
export const S3UploadFiles = lazy(() => import('@base/containers/S3UploadFiles'));
export const PrioritySelect = lazy(() => import('@base/containers/PrioritySelect'));
export const DataSourceSelect = lazy(() => import('@base/containers/DataSourceSelect'));
export const LookUp = lazy(() => import('@base/containers/LookUp'));
export const CodeGenerator = lazy(() => import('@base/containers/CodeGenerator'));
export const WebsiteInput = lazy(() => import('@base/components/@hanbiro/WebsiteInput'));
export const AddressInput = lazy(() => import('@base/components/@hanbiro/AddressInput'));
export const EmailInput = lazy(() => import('@base/components/@hanbiro/EmailInput'));
export const PhoneInput = lazy(() => import('@base/components/@hanbiro/PhoneInput'));
export const MobileInput = lazy(() => import('@base/components/@hanbiro/MobileInput'));
export const FaxInput = lazy(() => import('@base/components/@hanbiro/FaxInput'));
export const GenderSelect = lazy(() => import('@base/components/@hanbiro/GenderSelect'));
export const AnniversaryInput = lazy(() => import('@base/components/@hanbiro/AnniversaryInput'));
export const NumberField = lazy(() => import('@base/components/@hanbiro/NumberField'));
export const BillShipAddress = lazy(() => import('@base/containers/BillShipAddress'));
export const NumberRangeField = lazy(() => import('@base/components/@hanbiro/NumberRangeField'));
export const SwitchWrite = lazy(() => import('@base/components/@hanbiro/Switch'));
export const AssignToInput = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const CountrySelect = lazy(() => import('@base/components/@hanbiro/CountrySelect'));
export const EmailPhoneTagInput = lazy(() => import('@base/containers/EmailPhoneTagInput'));
