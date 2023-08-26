import { lazy } from 'react';

export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const ProductView = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const ProductViewField = lazy(() => import('@product/product/containers/ViewFields/Product'));
export const CustomerAddressView = lazy(() => import('@customer/containers/ViewField/CustomerAddressView'));
export const CustomerTypeView = lazy(() => import('@customer/containers/ViewField/CustomerTypeView'));

// export const GenderView = lazy(() => import('@customer/customer/containers/view-field/gender'));
// export const RelatedAccountView = lazy(
//   () => import('@customer/customer/containers/view-field/related-account'),
// );
// export const RelatedContactView = lazy(
//   () => import('@customer/customer/containers/view-field/related-contact'),
// );
// export const AnniversaryView = lazy(
//   () => import('@customer/customer/containers/view-field/anniversary'),
// );
// export const PaymentTermView = null;
// export const SendModeView = lazy(
//   () => import('@customer/customer/containers/view-field/send-mode'),
// );
// export const BillShipAddressView = lazy(
//   () => import('@customer/customer/containers/view-field/bill-ship-address'),
// );
