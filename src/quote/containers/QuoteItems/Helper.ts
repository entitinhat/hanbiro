export function parseProductItemValueInput(quoteData: any, currency: any) {
  let items: any = [];
  let totalNetAmount = 0;
  let totalQty = 0;
  quoteData.items?.map((_ele: any) => {
    const newItem = {
      id: _ele.id,
      type: _ele.type,
      item: { ..._ele.productItem, prod: _ele.product },
      image: { photo: '', name: '' }, //TODO
      unit: _ele.productItem.unit,
      attrValues: _ele.productItem.attrValues,
      priceUnit: { amount: _ele.price, currency: quoteData.currency },
      orderedQty: _ele.qty,
      orderedAmount: { amount: _ele.amount, currency: quoteData.currency }
    };
    totalNetAmount += _ele.amount;
    totalQty += _ele.qty;
    items.push(newItem);
  });
  let summary = {
    currency: currency,
    totalItems: totalQty,
    netAmount: totalNetAmount,
    totalDiscount: quoteData.totalDiscount,
    totalLoyalty: 0,
    loyalty: {
      point: 0,
      isPointUseMax: true,
      coupon: 0,
      stamp: 0,
      isStampNotUse: true
    },
    subTotal: quoteData.subTotalAmount,
    shippingCharge: {
      amount: 0,
      isApplyTax: false
    },
    totalShippingCharge: quoteData.shipCharge,
    totalTax: quoteData.taxAmount,
    taxUnit: quoteData.tax, //%
    roundOff: quoteData.roundOff,
    totalAmount: quoteData.totalAmount
  };

  return { items, summary };
}
