import { lazy } from 'react';

// export const CustomerView = lazy(
//   () => import('@customer/customer/containers/view-field/customer-view'),
// );
// export const BillToShipToView = lazy(
//   () => import('@customer/customer/containers/view-field/bill-to-ship-to'),
// );
// export const PriceListAutoCompleteView = lazy(
//   () => import('@product/price-list/containers/view-field/pricelist-auto-complete'),
// );

export const CustomerView = lazy(() => import('@customer/containers/ViewField/Customer'));
export const CustomerNoteView = lazy(() => import('@quote/containers/ViewField/CustomerNote'));
export const TermConditionView = lazy(() => import('@quote/containers/ViewField/TermCondition'));
export const QuoteItemsView = lazy(() => import('@quote/containers/QuoteItems')); //TODO
export const CustomerAutoComplete = lazy(() => import('@quote/containers/ViewField/CustomerView'));
export const QuoteTplView = lazy(() => import('@quote/containers/ViewField/QuoteTplView'));
export const QuoteOpportunityView = lazy(() => import('@quote/containers/ViewField/QuoteOpportunityView'));
