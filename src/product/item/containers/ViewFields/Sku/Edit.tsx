import { useEffect, useState } from 'react';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import SKU from '@product/item/containers/Sku';
import { KEY_ITEM_SKU } from '@product/item/config/keyNames';

import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';

import { TextField } from '@mui/material';

import {
  SKU_GENERATOR_OPTION_ATTRIBUTE_1,
  SKU_GENERATOR_OPTION_ATTRIBUTE_2,
  SKU_GENERATOR_OPTION_ITEM_NAME,
  SKU_GENERATOR_OPTION_PRODUCT_GROUP,
  SKU_GENERATOR_OPTION_PRODUCT_NAME,
  SKU_GENERATOR_OPTION_UNIT_NAME,
  GENERATOR_AUTO,
  GENERATOR_MANUAL
} from '@product/item/config/sku';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nVal: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;
  const data = {
    ...value,
    [SKU_GENERATOR_OPTION_PRODUCT_GROUP]: value?.prod?.group?.name || '',
    [SKU_GENERATOR_OPTION_PRODUCT_NAME]: value?.prod?.name || '',
    [SKU_GENERATOR_OPTION_ITEM_NAME]: value?.name || '',
    [SKU_GENERATOR_OPTION_UNIT_NAME]: value?.unitVal?.name || '',
    [SKU_GENERATOR_OPTION_ATTRIBUTE_1]: value?.attrValues?.[0]?.name || '',
    [SKU_GENERATOR_OPTION_ATTRIBUTE_2]: value?.attrValues?.[1]?.name || ''
  };

  const [generatorType, setGeneratorType] = useState<string>('manual');
  const { data: skuSettingData } = useProductGeneralSetting({
    key: 'product_sku_setting',
    menu: 'product'
  });

  useEffect(() => {
    if (skuSettingData) {
      const curSKUData = JSON.parse(skuSettingData?.value);
      setGeneratorType(curSKUData?.generator);
    }
  }, [skuSettingData]);

  const handleOnChange = (nVal: string | string[]) => {
    onChange &&
      onChange({
        ...data,
        [KEY_ITEM_SKU]: nVal
      });
  };

  return (
    <SKU
      editManual={generatorType == GENERATOR_MANUAL}
      value={[value?.[KEY_ITEM_SKU]] ?? []}
      onChange={handleOnChange}
      data={data}
      single={true}
    />
  );
};

export default Edit;
