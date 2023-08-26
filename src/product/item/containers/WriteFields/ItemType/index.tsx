import React, { useEffect, useState } from 'react';

import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
import { PRODUCT_ITEM_TYPE_OPTIONS, PRODUCT_TYPE_PRODUCED } from '@product/main/config/constants';
import { KEY_PRODUCT_TYPE, KEY_PRODUCT_TYPE_BE_SOLD } from '@product/product/config/keyNames';
import _ from 'lodash';

interface ItemTypeProps {
  value: any;
  onChange?: (nVal: any) => void;
  prodData?: any;
}

const ItemType = (props: ItemTypeProps) => {
  const { value, onChange, prodData } = props;

  const [options, setOptions] = useState<any[]>(PRODUCT_ITEM_TYPE_OPTIONS);

  useEffect(() => {
    const newOptions: any[] = _.cloneDeep(PRODUCT_ITEM_TYPE_OPTIONS);

    // If the Supply Method- Produced' is checked, Item Type: Bundle(Composite) cannot be selected (automatically disabled)
    if (prodData?.[KEY_PRODUCT_TYPE] === PRODUCT_TYPE_PRODUCED) {
      newOptions[1].disabled = true;
    }

    // Prepaid item cannot be created when the 'Suply Method-Can be Sold' is not checked. (Automatically disable)
    // if (!prodData[KEY_PRODUCT_TYPE_BE_SOLD]) {
    //   newOptions[2].disabled = true;
    // }

    setOptions(newOptions);
  }, [prodData]);

  return <MuiRadioGroup size="md" options={options} value={value} onChange={onChange} disabled={!prodData} />;
};

export default ItemType;
