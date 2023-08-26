import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import PercentIcon from '@mui/icons-material/Percent';
import { Box, Divider, Stack, TextField, Typography, useTheme } from '@mui/material';
import Section from '@settings/preferences/components/Section';
import { useProductGeneralMutaion } from '@settings/preferences/hooks/product/useProductGeneralMutaion';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CostOfGoods = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [cost, setCost] = useState<string>('');

  //get data
  const params = {
    key: 'cost_of_good',
    menu: 'product'
  };
  const { data: costData, isLoading } = useProductGeneralSetting(params);

  // init
  useEffect(() => {
    if (!isLoading && costData) {
      const curCost = JSON.parse(costData?.value);
      setCost(curCost);
    }
  }, [costData]);

  // update
  const mUpdate = useProductGeneralMutaion();

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(e.target.value.toString());
  };

  const handleCostSave = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const params: any = {
      menu: 'product',
      key: 'cost_of_good',
      value: e.target.value.toString()
    };
    mUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['setting_menuSetting', 'product', 'cost_of_good'] });
        }
      }
    );
  };

  return (
    <MainCard
      content
      title={
        <>
          <SpanLang tag={'h6'} keyLang={'ncrm_generalsetting_preferences_product_cost_of_good'} />
          <Typography variant="caption" color="textSecondary">
            <SpanLang tag={'h6'} keyLang={'ncrm_generalsetting_preferences_product_cost_of_good_sub_title'} textOnly />
          </Typography>
        </>
      }
    >
      <Stack direction="row" alignItems="center">
        <Typography>{t('ncrm_generalsetting_preferences_product_approximately')}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" variant="middle" flexItem />}
          sx={{ border: '1px solid' + theme.palette.divider, borderRadius: '0.25rem', mx: '10px' }}
        >
          <TextField
            value={cost}
            onChange={handleCostChange}
            onBlur={handleCostSave}
            type="number"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { border: 0 }
            }}
          />
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ px: '8px' }}>
            <PercentIcon color="disabled" />
          </Stack>
        </Stack>
        <Typography>{t('ncrm_generalsetting_preferences_product_of_base_price')}</Typography>
      </Stack>
    </MainCard>
  );
};

export default CostOfGoods;
