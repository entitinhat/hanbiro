import SpanLang from '@base/components/@hanbiro/SpanLang';
import Switch from '@base/components/@hanbiro/Switch';
import MainCard from '@base/components/App/MainCard';
import { FormControlLabel } from '@mui/material';
import { useProductGeneralMutaion } from '@settings/preferences/hooks/product/useProductGeneralMutaion';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const CanBeSold = () => {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<boolean>(false);

  //get data
  const params = {
    key: 'can_be_sold',
    menu: 'product'
  };
  const { data, isLoading } = useProductGeneralSetting(params);

  // init
  useEffect(() => {
    if (!isLoading && data) {
      const apiVal = data?.value === 'true' ? true : false;
      setValue(apiVal);
    }
  }, [data]);

  // update
  const mUpdate = useProductGeneralMutaion();

  const handleChange = (nVal: boolean) => {
    setValue(nVal);
    handleSave(nVal);
  };

  const handleSave = (nVal: boolean) => {
    const params: any = {
      menu: 'product',
      key: 'can_be_sold',
      value: nVal
    };

    mUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['setting_menuSetting', 'product', 'can_be_sold'] });
        }
      }
    );
  };

  return (
    <MainCard content title={<SpanLang keyLang={'ncrm_setting_product_can_be_sold'} />}>
      <Switch label="ncrm_setting_product_can_be_sold_allow_automatically" onChange={handleChange} value={value} />
    </MainCard>
  );
};

export default CanBeSold;
