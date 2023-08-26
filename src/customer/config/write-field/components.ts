import { lazy } from 'react';

// Customer
// export const Input = lazy(() => import('@base/components/form/input'));
// export const CurrencyInput = lazy(() => import('@base/containers/currency-input'));
// export const IpAddress = lazy(() => import('@customer/customer/components/ip-address'));
// export const Email = lazy(() => import('@customer/customer/components/email'));
// export const Gender = lazy(() => import('@customer/customer/components/gender'));
// export const Address = lazy(() => import('@customer/customer/components/address'));
// export const Phone = lazy(() => import('@customer/customer/components/phone'));
// export const Mobile = lazy(() => import('@customer/customer/components/mobile'));
// export const Website = lazy(() => import('@customer/customer/components/website'));
// export const Anniversary = lazy(() => import('@customer/customer/components/anniversary'));
// export const DataSourceSelect = lazy(() => import('@base/containers/data-source-select'));
// export const MenuSourceSelect = lazy(() => import('@base/containers/menu-source-select'));
// export const ImageUploader = lazy(() => import('@base/components/form/image-uploader'));
// export const InputCodeGenerator = lazy(() => import('@base/containers/code-generator'));

// export const SalesCommission = lazy(() => import('@customer/customer/components/sales-commission'));

// export const UserAutoComplete = lazy(() => import('@base/containers/user-auto-complete'));
// export const ProductAutoComplete = lazy(
//   () => import('@product/product/containers/product-auto-complete'),
// );

export const ImageUpload = lazy(() => import('@base/components/@hanbiro/ImageUpload'));
export const CustomerAutoComplete = lazy(() => import('@customer/containers/CustomerAutoComplete'));
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));
export const ProductAutoComplete = lazy(() => import('@product/product/containers/ProductAutoComplete'));
