//third-party
import _ from 'lodash';

//menu
import * as keyNames from '@quote/config/keyNames';
import { KEY_NAME_CUSTOMER_BILL_ADDRESSES, KEY_NAME_CUSTOMER_SHIP_ADDRESSES } from '@customer/config/keyNames';
import { QUOTE_CATEGORY_REVISION } from '@quote/config/constants';

export const getProductDetailParam = (productDetails: any) => {
  if (productDetails?.length > 0) {
    const onetimeParams: any = {
      totalTpl: null,
      currency: productDetails[0].currency,
      shipCharge: 0,
      totalTax: 0,
      totalDiscount: 0,
      subTotalAmount: 0
    };
    //calculate total
    let totalAmount = 0;
    productDetails.map((_item: any) => {
      totalAmount += _item.orderedAmount;
    });
    onetimeParams.totalAmount = totalAmount;
    //items
    onetimeParams.items = productDetails.map((_item: any) => ({
      product: {
        id: _item.prod.id,
        name: _item.prod.name
      },
      productItem: {
        id: _item.id,
        name: _item.name
      },
      itemQty: _item.orderedQty,
      itemPrice: _item.orderedPrice,
      itemDiscount: 0,
      itemAmount: _item.orderedAmount
    }));
    //final
    return onetimeParams;
  } else {
    return null;
  }
};

export const finalizeParams = (configParams: any, category?: string) => {
  const newParams = { ...configParams };

  //change code if revision
  if (category === QUOTE_CATEGORY_REVISION) {
    newParams[keyNames.KEY_NAME_QUOTE_CODE] = newParams[keyNames.KEY_NAME_QUOTE_REVISION_ID];
  }
  if (newParams.hasOwnProperty(keyNames.KEY_NAME_QUOTE_REVISION_ID)) {
    delete newParams[keyNames.KEY_NAME_QUOTE_REVISION_ID];
  }

  //account or contact
  const customerParam = _.cloneDeep(newParams[keyNames.KEY_NAME_QUOTE_CUSTOMER]);
  newParams[keyNames.KEY_NAME_QUOTE_CUSTOMER] = { id: customerParam.id, name: customerParam.name };
  newParams[keyNames.KEY_NAME_QUOTE_CUSTOMER_CATEGORY] = customerParam?.category;
  if (customerParam?.[KEY_NAME_CUSTOMER_BILL_ADDRESSES]) {
    newParams[keyNames.KEY_NAME_QUOTE_BILL_TO] = customerParam[KEY_NAME_CUSTOMER_BILL_ADDRESSES];
  }
  if (customerParam?.[KEY_NAME_CUSTOMER_SHIP_ADDRESSES]) {
    newParams[keyNames.KEY_NAME_QUOTE_SHIP_TO] = customerParam[KEY_NAME_CUSTOMER_SHIP_ADDRESSES];
  }

  //items
  const itemData = _.cloneDeep(newParams[keyNames.KEY_NAME_QUOTE_ITEMS]);
  if (itemData?.data) {
    //items
    const newItems = itemData.data.map((_ele: any) => ({
      type: _ele.type,
      product: {
        id: _ele.item.prod.id,
        name: _ele.item.prod.name
      },
      productItem: {
        id: _ele.item.id,
        name: _ele.item.name
      },
      discount: 0,
      price: _ele.priceUnit.amount,
      qty: _ele.orderedQty,
      amount: _ele.orderedAmount.amount
    }));
    newParams[keyNames.KEY_NAME_QUOTE_ITEMS] = newItems;
    //summary
    newParams[keyNames.KEY_NAME_QUOTE_CURRENCY] = itemData.summary.currency.code;
    newParams.totalDiscount = 0;
    newParams.subTotalAmount = 0;
    newParams.shipCharge = 0;
    newParams.isApplyTax = false;
    newParams.tax = 10;
    newParams.taxAmount = 0;
    newParams.roundOff = 0;
    newParams.totalAmount = itemData.summary.totalAmount;
  } else {
    newParams[keyNames.KEY_NAME_QUOTE_ITEMS] = [];
  }

  //term and condition
  const termData = _.cloneDeep(newParams[keyNames.KEY_NAME_QUOTE_TERM_CONDITION]);
  if (termData) {
    newParams[keyNames.KEY_NAME_QUOTE_TERM_CONDITION] = { id: termData.term.id, name: termData.term.title };
    newParams[keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT] = termData.content;
  } else {
    newParams[keyNames.KEY_NAME_QUOTE_TERM_CONDITION] = null;
    newParams[keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT] = '';
  }

  return newParams;
};
