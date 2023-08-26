import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { DIMENSION_UNIT_OPTIONS, WEIGHT_UNIT_OPTIONS } from '@base/config/constant';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Section from '@settings/preferences/components/Section';
import { useProductGeneralMutaion } from '@settings/preferences/hooks/product/useProductGeneralMutaion';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ItemMeasurementProps {}

const ItemMeasurement = (props: ItemMeasurementProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [measureValue, setMeasureValue] = useState<any>({ dimension: 'cm', weight: 'kg' });

  //get data
  const params = {
    key: 'item_measurement',
    menu: 'product'
  };
  const { data: measureData, isLoading } = useProductGeneralSetting(params);

  // update
  const mUpdate = useProductGeneralMutaion();

  // init
  useEffect(() => {
    if (!isLoading && measureData) {
      const curValue = JSON.parse(measureData?.value);
      setMeasureValue(curValue);
    }
  }, [measureData]);

  // handlers
  const handleMeasureChange = (fieldValue: string, nData: any) => {
    const nMeasureValue = { ...measureValue };
    nMeasureValue[fieldValue] = nData;
    setMeasureValue(nMeasureValue);
    handleMeasureSave(nMeasureValue);
  };

  const handleMeasureSave = (nMeasureValue: any) => {
    const params: any = {
      menu: 'product',
      key: 'item_measurement',
      value: JSON.stringify(nMeasureValue)
    };
    mUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['setting_menuSetting', 'product', 'item_measurement'] });
        }
      }
    );
  };

  return (
    <MainCard content title={<SpanLang keyLang={'ncrm_generalsetting_preferences_product_item_measurement'} />}>
      <Typography color="secondary">
        <SpanLang keyLang={'ncrm_generalsetting_preferences_product_default_dimension'} textOnly />
      </Typography>
      <FormControl>
        <RadioGroup
          row
          name="measure-weight"
          value={measureValue.dimension || DIMENSION_UNIT_OPTIONS[0].value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMeasureChange('dimension', e.target.value)}
        >
          {DIMENSION_UNIT_OPTIONS?.map((item: any, index: number) => (
            <FormControlLabel key={index} value={item?.value} control={<Radio />} label={item?.label} />
          ))}
        </RadioGroup>
      </FormControl>
      <Typography color="secondary" sx={{ pt: 1 }}>
        <SpanLang keyLang={'ncrm_generalsetting_preferences_product_default_weight'} textOnly />
      </Typography>
      <FormControl>
        <RadioGroup
          row
          name="measure-weight"
          value={measureValue.weight || WEIGHT_UNIT_OPTIONS[0].value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMeasureChange('weight', e.target.value)}
        >
          {WEIGHT_UNIT_OPTIONS?.map((item: any, index: number) => (
            <FormControlLabel key={index} value={item?.value} control={<Radio />} label={item?.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </MainCard>
  );
};

export default ItemMeasurement;
