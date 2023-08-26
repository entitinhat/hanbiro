import { useEffect, useState } from 'react';

//third-party
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

//material
import { Button, Stack } from '@mui/material';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@mui/icons-material';

//project
import { defaultCurrencySelector } from '@base/store/selectors/app';
import LoadingButton from '@base/components/@extended/LoadingButton';

//menu
import useQuoteUpdate from '@quote/hooks/useQuoteUpdate';
import * as keyNames from '@quote/config/keyNames';

//local
import Items from './Items';
import Summary from './Summary';

interface QuoteItemsProps {
  mode: 'v' | 'w' | 'p'; //p: print
  menuSource?: string;
  menuSourceId?: string;
  value: { data: any; summary: any };
  onChange?: (val: any) => void;
  title?: string | null;
}

const QuoteItems = (props: QuoteItemsProps) => {
  const { mode = 'w', menuSource, menuSourceId, value, onChange, ...restProps } = props;
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  const defaultSummary = {
    currency: defaultCurrency,
    totalItems: 0,
    netAmount: 0,
    totalDiscount: 0,
    totalLoyalty: 0,
    loyalty: {
      point: 0,
      isPointUseMax: true,
      coupon: 0,
      stamp: 0,
      isStampNotUse: true
    },
    subTotal: 0,
    shippingCharge: {
      amount: 0,
      isApplyTax: true
    },
    totalShippingCharge: 0,
    totalTax: 0,
    taxUnit: 10, //%
    roundOff: 0,
    totalAmount: 0
  };
  //state
  const [items, setItems] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(defaultSummary);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  //hook
  const mQuoteUpdate = useQuoteUpdate({});

  //value change
  useEffect(() => {
    if (value) {
      if (value?.data) {
        if (!_.isEqual(value.data, items)) {
          setItems(value.data);
        }
      }
      if (value?.summary) {
        if (!_.isEqual(value.summary, summary)) {
          setSummary(value.summary);
        }
      }
    } else {
      setItems([]);
      setSummary(defaultSummary);
    }
  }, [value]);

  //update success
  useEffect(() => {
    if (mQuoteUpdate.isSuccess) {
      setIsEdit(false);
    }
  }, [mQuoteUpdate.isSuccess]);

  //save update
  const handleSave = () => {
    const newParams: any = {
      id: menuSourceId
    };
    //items
    const newItems = items.map((_ele: any) => ({
      id: _ele.id,
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
    newParams.totalDiscount = summary.totalDiscount;
    newParams.subTotalAmount = summary.subTotal;
    newParams.shipCharge = summary.totalShippingCharge;
    newParams.isApplyTax = summary.shippingCharge.isApplyTax;
    newParams.tax = summary.taxUnit;
    newParams.taxAmount = summary.totalTax;
    newParams.roundOff = summary.roundOff;
    newParams.totalAmount = summary.totalAmount;
    //start save
    mQuoteUpdate.mutate({ quote: newParams });
  };

  //items updater
  const handleDataChange = (newData: any) => {
    setItems(newData);
    //re-calculate total
    let totalAmount = 0;
    let totalQty = 0;
    newData.map((_ele: any) => {
      totalAmount += _ele.orderedAmount.amount;
      totalQty += _ele.orderedQty;
    });
    const newSummary = { ...summary, totalItems: totalQty, netAmount: totalAmount, totalAmount };
    setSummary(newSummary);

    //callback
    onChange && onChange({ data: newData, summary: newSummary });
  };

  //TODO: summary value
  const handleSummaryChange = (newValue: any) => {};

  console.log('quote items', items);
  return (
    <Stack spacing={1.5} sx={{ mr: 2 }}>
      {mode === 'v' && (
        <Stack direction={'row'} justifyContent={'end'} spacing={1}>
          {isEdit && (
            <>
              <Button color="secondary" variant="outlined" size="small" onClick={() => setIsEdit(false)} startIcon={<CloseOutlined />}>
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                color="primary"
                size="small"
                loading={mQuoteUpdate.isLoading}
                onClick={handleSave}
                startIcon={<CheckOutlined />}
              >
                Save
              </LoadingButton>
            </>
          )}
          {!isEdit && (
            <Button variant="contained" size="small" onClick={() => setIsEdit(true)} startIcon={<EditOutlined />}>
              Edit
            </Button>
          )}
        </Stack>
      )}
      <Items menuSourceId={menuSourceId} isEdit={isEdit} mode={mode} items={items} onChange={handleDataChange} {...restProps} />
      <Summary value={summary} onChange={handleSummaryChange} />
    </Stack>
  );
};

export default QuoteItems;
