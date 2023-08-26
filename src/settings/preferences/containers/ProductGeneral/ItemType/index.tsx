import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { PRODUCT_ITEM_TYPE_OPTIONS } from '@product/main/config/constants';
import { useProductGeneralMutaion } from '@settings/preferences/hooks/product/useProductGeneralMutaion';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const ItemType = () => {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string>('');

  const keyName = 'default_item_type';

  //get data
  const params = {
    key: keyName,
    menu: 'product'
  };
  const { data, isLoading } = useProductGeneralSetting(params);

  // init
  useEffect(() => {
    if (!isLoading && data) {
      const oldVal = data?.value;
      setValue(oldVal);
    }
  }, [data]);

  // update
  const mUpdate = useProductGeneralMutaion();

  const handleChange = (nVal: string) => {
    setValue(nVal);
    handleSave(nVal);
  };

  const handleSave = (nVal: string) => {
    const params: any = {
      menu: 'product',
      key: keyName,
      value: nVal
    };

    mUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['setting_menuSetting', 'product', keyName] });
        }
      }
    );
  };

  return (
    <MainCard content title={<SpanLang keyLang={'ncrm_setting_product_default_item_type'} />}>
      <FormControl>
        <RadioGroup
          row
          name="measure-weight"
          value={value || PRODUCT_ITEM_TYPE_OPTIONS[0].value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value as string)}
        >
          {PRODUCT_ITEM_TYPE_OPTIONS?.map((item: any, index: number) => (
            <FormControlLabel key={index} value={item?.value} control={<Radio />} label={<SpanLang keyLang={item?.label} />} />
          ))}
        </RadioGroup>
      </FormControl>
    </MainCard>
  );
};

export default ItemType;
