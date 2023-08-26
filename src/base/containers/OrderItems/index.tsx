import { useEffect, useState } from 'react';

//third-party
import _ from 'lodash';
import { useRecoilValue } from 'recoil';

//material
import { Stack } from '@mui/material';

//project
import { defaultCurrencySelector } from '@base/store/selectors/app';

//related-menu
import ItemAutoComplete from '@product/item/containers/ItemAutoComplete';
import { Item } from '@product/item/types/item';
import { useQuoteCreateItem, useQuoteProductSummaryUpdate, useQuoteUpdateItem } from '@quote/hooks/useQuoteProductDetail';

//menu
import OneTimeItems from './OneTimeItems';
import Summary from './Summary';

interface OrderItemsProps {
  mode: 'v' | 'w' | 'p'; //p: print
  menuSource?: string;
  menuSourceId?: string;
  value: any[]; //items
  onChange?: (val: any[]) => void;
  title?: string | null;
}

const OrderItems = (props: OrderItemsProps) => {
  const { mode = 'w', menuSource, menuSourceId, value, onChange, ...restProps } = props;
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  //state
  const [items, setItems] = useState<any[]>([]);
  const [addedItem, setAddedItem] = useState<any>(null);
  //hook
  const mCreate = useQuoteCreateItem();
  const mUpdate = useQuoteUpdateItem();
  const mSummaryUpdate = useQuoteProductSummaryUpdate();

  //value change
  useEffect(() => {
    if (value) {
      if (!_.isEqual(value, items)) {
        setItems(value);
      }
    } else {
      setItems([]);
    }
  }, [value]);

  //check create success
  useEffect(() => {
    if (mCreate.isSuccess) {
      const newItems = [...items];
      const addedIdx = newItems.findIndex((_ele: any) => _ele.id === addedItem.id);
      if (addedIdx > -1) {
        newItems[addedIdx].quoteItemId = mCreate.data.id;
        setItems(newItems);

        //update summary
        handleSummaryUpdate(newItems);
      }
    }
  }, [mCreate.isSuccess]);

  //update summary when success
  useEffect(() => {
    if (mUpdate.isSuccess) {
      handleSummaryUpdate(items);
    }
  }, [mUpdate.isSuccess]);

  //summary update - just apply for view
  const handleSummaryUpdate = (items: Item[]) => {
    if (mode === 'v') {
      let totalAmount = 0;
      items.map((_ele: any) => {
        totalAmount += _ele.orderedAmount;
      });
      const params = {
        id: menuSourceId,
        onetime: {
          totalAmount
        }
      };
      mSummaryUpdate.mutate({ quote: params });
    }
  };

  //select new item
  const handleItemChange = (selected: Item | Item[] | null) => {
    if (selected) {
      const newItems = [...items];
      const item: Item = Array.isArray(selected) ? selected[0] : selected;
      const existIdx = newItems.findIndex((_ele: any) => _ele.id === item.id);
      const defaultPrice = item.basePrices.find((_ele: any) => _ele.currency === defaultCurrency.code);
      if (existIdx === -1) {
        //add to table
        newItems.push({
          ...item,
          orderedPrice: defaultPrice?.amount || 0,
          orderedQty: item?.unitVal.qty || 1,
          orderedAmount: (item?.unitVal.qty || 1) * (defaultPrice?.amount || 0),
          currency: defaultCurrency.code
        });
        setItems(newItems);
        setAddedItem(item);
        //save in mode view
        if (mode === 'v') {
          const createParams = {
            id: menuSourceId,
            item: {
              product: {
                id: item.prod.id,
                name: item.prod.name
              },
              productItem: {
                id: item.id,
                name: item.name
              },
              itemQty: item?.unitVal.qty || 1,
              itemPrice: defaultPrice?.amount || 0,
              itemDiscount: 0,
              itemAmount: (item?.unitVal.qty || 1) * (defaultPrice?.amount || 0)
            }
          };
          mCreate.mutate(createParams);
        }
      } else {
        //existed, increase qty
        newItems[existIdx].orderedQty += 1;
        newItems[existIdx].orderedAmount = newItems[existIdx].orderedQty * (defaultPrice?.amount || 0);
        setItems(newItems);
        //update to db in mode view
        if (mode === 'v') {
          const updateParams = {
            id: menuSourceId,
            item: {
              id: newItems[existIdx].quoteItemId,
              itemQty: newItems[existIdx].orderedQty,
              itemAmount: newItems[existIdx].orderedAmount
            }
          };
          mUpdate.mutate(updateParams);
        }
      }
      //callback
      onChange && onChange(newItems);
    }
  };

  //items updater
  const handleDataChange = (newData: any) => {
    //calculate amount when qty changes
    const newItems = [...newData];
    newItems.map((_item: Item) => {
      const defaultPrice = _item.basePrices.find((_ele: any) => _ele.currency === defaultCurrency.code);
      _item.orderedAmount = _item.orderedQty * (defaultPrice?.amount || 0);
    });
    setItems(newItems);
    //callback
    onChange && onChange(newItems);
    //update summary
    handleSummaryUpdate(newItems); //CONSIDER: waiting for update qty/delete finished
  };

  console.log('product items', items);
  return (
    <Stack>
      <OneTimeItems menuSourceId={menuSourceId} isEdit={true} mode={mode} items={items} onChange={handleDataChange} {...restProps} />
      {mode !== 'p' && <ItemAutoComplete single={true} visible={false} value={[]} onChange={handleItemChange} />}
      <Summary items={items} />
    </Stack>
  );
};

export default OrderItems;
