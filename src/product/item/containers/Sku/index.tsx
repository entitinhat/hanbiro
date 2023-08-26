import React, { useEffect, useState } from 'react';

import { Box, Button, IconButton, Stack } from '@mui/material';
import _ from 'lodash';
import { useRecoilState } from 'recoil';

import { Add, Remove } from '@mui/icons-material';

import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';

import { skuSettingsAtom } from '@product/item/store/atoms/sku';
import { generateCode, validateSKU } from '@product/item/config/sku';

import ProductSKUInput from './Input';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface SkuProps {
  single: boolean;
  value: string[];
  data?: any;
  onChange?: (val: string | string[]) => void;
  editManual?: boolean;
}

const SKU = (props: SkuProps) => {
  const { value, data, onChange, single = true, editManual = false } = props;

  const [skuSetting, setSkuSetting] = useRecoilState(skuSettingsAtom);

  const [skus, setSkus] = useState<string[]>(value);

  useEffect(() => {
    if (single && _.isEmpty(skus) && skuSetting) {
      const newSkus = _.cloneDeep(skus) || [];
      const newSku = generateCode(
        {
          valueRows: skuSetting?.valueRows,
          seperator: skuSetting?.seperator,
          caseUse: skuSetting?.caseUse
        },
        data
      );
      let stringSku = validateSKU(newSku, newSkus);
      newSkus.push(stringSku);

      setSkus(newSkus);
      onChange && onChange(editManual ? value : stringSku);
    }
  }, [single, skus, skuSetting]);

  useEffect(() => {
    if(skuSetting){
      let newSkus = _.cloneDeep(skus) || [];
      const newSku = generateCode(
        {
          valueRows: skuSetting?.valueRows,
          seperator: skuSetting?.seperator,
          caseUse: skuSetting?.caseUse
        },
        data
      );
      let stringSku = validateSKU(newSku, newSkus);
      newSkus = single ? [newSku] : [stringSku];
      setSkus(newSkus);
      onChange && onChange(editManual ? _.isArray(value) ? value?.[0] : value : single ?  newSku :  stringSku );
    }
  },[skuSetting])

  // GET setting
  const params = {
    menu: 'product',
    key: 'product_sku_setting'
  };
  const { data: config } = useMenuSetting(params, { enabled: !skuSetting });

  useEffect(() => {
    if (config) {
      const newSetting = JSON.parse(config?.value);
      setSkuSetting(newSetting);
    }
  }, [config]);

  const handleAddSku = () => {
    const newSkus = _.cloneDeep(skus) || [];
    const newSku = generateCode(
      {
        valueRows: skuSetting?.valueRows,
        seperator: skuSetting?.seperator,
        caseUse: skuSetting?.caseUse
      },
      data
    );
    let stringSku = validateSKU(newSku, newSkus);
    newSkus.push(stringSku);

    setSkus(newSkus);
    onChange && onChange(newSkus);
  };

  const handleRemoveSku = (rIndex: number) => {
    const newSkus = _.cloneDeep(skus) || [];
    newSkus.splice(rIndex, 1);

    setSkus(newSkus);
    onChange && onChange(newSkus);
  };

  const handleChangeSku = (nSku: string, index: number) => {
    const newSkus = _.cloneDeep(skus) || [];
    newSkus[index] = nSku;

    setSkus(newSkus);
    onChange && onChange(single ? nSku : newSkus);
  };

  // console.log('...SKU.data...', data, skuSetting);
  return (
    <Stack spacing={1} direction="column">
      {skus?.map((item: string, index: number) => {
        return (
          <Stack key={index} spacing={1} direction="row" alignItems={'center'}>
            <ProductSKUInput manualValue={value[0]} value={item} defaultSetting={skuSetting} onChange={(nVal: string) => handleChangeSku(nVal, index)} editManual={editManual} />
            {!single && (
              <IconButton
                size={'small'}
                onClick={() => {
                  handleRemoveSku(index);
                }}
              >
                <Remove color={'error'} />
              </IconButton>
            )}
          </Stack>
        );
      })}
      {!single && (
        <Stack spacing={1} direction="row">
          <Button
            color="primary"
            size="small"
            onClick={() => {
              handleAddSku();
            }}
            startIcon={<Add />}
          >
            <SpanLang keyLang={'ncrm_common_add_sku'} textOnly />
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
export default SKU;
