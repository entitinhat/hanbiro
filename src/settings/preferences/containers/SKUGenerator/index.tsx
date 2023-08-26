import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@mui/system';

import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { MenuSetting } from '@base/types/setting';
import { nanoid } from '@base/utils/helpers';
import {
  CASE_LOWER,
  CASE_UPPER,
  generateCode,
  GENERATOR_AUTO,
  GENERATOR_MANUAL,
  SEPERATOR_HYPHEN,
  SEPERATOR_SLASH,
  SKU_GENERATOR_OPTION_ATTRIBUTE_1,
  SKU_GENERATOR_OPTION_ATTRIBUTE_2,
  SKU_GENERATOR_OPTION_CUSTOM,
  SKU_GENERATOR_OPTION_ITEM_NAME,
  SKU_GENERATOR_OPTION_PRODUCT_GROUP,
  SKU_GENERATOR_OPTION_PRODUCT_NAME,
  SKU_GENERATOR_OPTION_UNIT_NAME
} from '@product/item/config/sku';
import { useGenerateBarcode } from '@settings/preferences/hooks/product/useGenerateBarcode';
import { useProductSKUMutaion } from '@settings/preferences/hooks/product/useProductSKUMutation';
import { useProductSKUSetting } from '@settings/preferences/hooks/product/useProductSKUSetting';

import SKUValueItem from './SKUValueItem';

interface SKUGeneratorProps {
  isDrawer?: boolean;
  sx?: SxProps;
}

const SKUGenerator = (props: SKUGeneratorProps) => {
  const { isDrawer = false, sx } = props;

  const theme = useTheme();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // state
  const [SKUData, setSKUData] = useState<any>({});
  const [settingId, setSettingId] = useState<string>('');
  const [valueRows, setValueRows] = useState<any>([]);
  const [skuValueSample, setSkuValueSample] = useState<string>('');
  const [skuBarcode, setSkuBarcode] = useState<any>(null);

  // get data
  const { data: SKUGeneratorData, isLoading, isFetching } = useProductSKUSetting();

  //sample for general code
  const SAMPLE_DATA = {
    [SKU_GENERATOR_OPTION_PRODUCT_GROUP]: 'GROUPDESK',
    [SKU_GENERATOR_OPTION_PRODUCT_NAME]: 'PRODUCTDESK',
    [SKU_GENERATOR_OPTION_ITEM_NAME]: 'ITEMDESK',
    [SKU_GENERATOR_OPTION_UNIT_NAME]: 'UNITDESK',
    [SKU_GENERATOR_OPTION_ATTRIBUTE_1]: 'COLOR',
    [SKU_GENERATOR_OPTION_ATTRIBUTE_2]: 'SIZE',
    [SKU_GENERATOR_OPTION_CUSTOM]: 'CUSTOMDESK'
  };

  // init
  useEffect(() => {
    if (!isLoading && SKUGeneratorData) {
      const curSKUData = JSON.parse(SKUGeneratorData?.value) || {};
      setSettingId(SKUGeneratorData?.id);
      setSKUData({ ...curSKUData, valueRows: curSKUData?.valueRows ?? [] });
      setValueRows(curSKUData.valueRows ?? []);
      setSkuValueSample(
        generateCode({ valueRows: curSKUData.valueRows, seperator: curSKUData.seperator, caseUse: curSKUData.caseUse }, SAMPLE_DATA)
      );
    }
  }, [SKUGeneratorData]);

  // generate barcode
  useEffect(() => {
    if (skuValueSample) {
      const params = {
        content: skuValueSample,
        width: 200,
        Height: 200,
        margin: 10,
        format: 'auto',
        lineColor: '#000000',
        background: '#ffffff',
        textAlign: 'center',
        textPosition: 'bottom'
      };
      mGenerateBarcode.mutate(params, {
        onSuccess: (data: any) => {
          setSkuBarcode(data.image);
        }
      });
    }
  }, [skuValueSample]);

  // update
  const mUpdate = useProductSKUMutaion();

  const mGenerateBarcode = useGenerateBarcode();

  // handlers
  const handleChangeSKUData = (fieldValue: string, nValue: any) => {
    const nSKUData = { ...SKUData };
    nSKUData[fieldValue] = nValue;
    setSKUData(nSKUData);
    handleSKUSave(nSKUData);
  };

  const handleSKUSave = (nSKUData: any) => {
    const params: MenuSetting = {
      id: settingId,
      menu: 'product',
      key: 'product_sku_setting',
      value: JSON.stringify(nSKUData)
    };
    mUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ['setting_menuSetting', 'product', 'product_sku_setting'] });
        }
      }
    );
  };

  const handleAddValueRow = () => {
    if (valueRows?.length >= 5) {
      return null;
    } else {
      const addValue = {
        id: nanoid(),
        attribute: {
          label: 'Product Group',
          value: 'productGroup'
        },
        customValue: '',
        lettersNr: 1,
        show: {
          label: 'First',
          value: 'first'
        }
      };

      const nSKUData = { ...SKUData };
      nSKUData.valueRows.push(addValue);
      setSKUData(nSKUData);
      handleSKUSave(nSKUData);
    }
  };

  const handleDeleteValueRow = (id: string) => {
    const nSKUData = { ...SKUData };
    const nValueRows = [...valueRows].filter((row: any) => row.id !== id);
    nSKUData.valueRows = nValueRows;
    setSKUData(nSKUData);
    handleSKUSave(nSKUData);
  };

  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '4px',
        maxHeight: isDrawer ? 'calc(100vh - 95px)' : 'calc(100vh - 200px)',
        ...sx
      }}
      className="scroll-box"
    >
      <>
        <Box>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group"
              name="SKU-type-generator"
              value={SKUData.generator || GENERATOR_AUTO}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeSKUData('generator', e.target.value);
              }}
            >
              <FormControlLabel
                value={GENERATOR_AUTO}
                control={<Radio />}
                label={t('ncrm_generalsetting_preferences_product_auto_generating')}
              />
              <FormControlLabel value={GENERATOR_MANUAL} control={<Radio />} label={t('ncrm_generalsetting_preferences_product_manual')} />
            </RadioGroup>
          </FormControl>
        </Box>
        {SKUData.generator === GENERATOR_AUTO && (
          <Box mt={2}>
            <Box>
              <Typography>{t('ncrm_generalsetting_preferences_product_sku_format_settings')}</Typography>
            </Box>
            <Box>
              <Typography sx={{ pb: 2 }}>{t('ncrm_generalsetting_preferences_product_sku_format_settings_sub_title')}</Typography>
            </Box>
            {/* SKU value rows */}
            {valueRows?.map((row: any, rowIdx: number) => (
              <Box key={row.id}>
                <SKUValueItem
                  rowIdx={rowIdx}
                  valueRow={row}
                  onDelete={(id: string) => handleDeleteValueRow(id)}
                  onChange={(rowIdx: number, nData: any) => {
                    let nValueRows: any = [...valueRows];
                    nValueRows[rowIdx] = nData;
                    handleChangeSKUData('valueRows', nValueRows);
                  }}
                />
              </Box>
            ))}

            {/* add button */}
            {valueRows?.length < 5 && (
              <Button size="small" sx={{ '&:hover': { bgcolor: 'transparent' } }} onClick={handleAddValueRow}>
                <AddIcon fontSize="small" />
                {t('ncrm_generalsetting_preferences_product_add_a_value')}
              </Button>
            )}

            {/* SKU sample */}
            <Box sx={{ mt: 4 }}>
              <Box sx={{ pb: '8px', mb: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Typography>{t('ncrm_generalsetting_preferences_product_sku_sample')}</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ '& img': { width: '100%', height: '150px' } }}>{skuBarcode && <img src={skuBarcode} alt="sku-preview" />}</Box>
                </Grid>

                <Grid item xs={6}>
                  <Box sx={{ mb: '16px' }}>
                    <Typography color="secondary">{t('ncrm_generalsetting_preferences_product_seperated_by')}</Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        name="seperator"
                        value={SKUData.seperator || SEPERATOR_HYPHEN}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChangeSKUData('seperator', e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={SEPERATOR_HYPHEN}
                          control={<Radio />}
                          label={t('ncrm_generalsetting_preferences_product_hyphen')}
                        />
                        <FormControlLabel
                          value={SEPERATOR_SLASH}
                          control={<Radio />}
                          label={t('ncrm_generalsetting_preferences_product_slash')}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box sx={{ mb: '16px' }}>
                    <Typography color="secondary">{t('ncrm_generalsetting_preferences_product_case_used')}</Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        name="caseUsed"
                        value={SKUData.caseUse || CASE_UPPER}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChangeSKUData('caseUse', e.target.value);
                        }}
                      >
                        <FormControlLabel
                          value={CASE_UPPER}
                          control={<Radio />}
                          label={t('ncrm_generalsetting_preferences_product_upper_case')}
                        />
                        <FormControlLabel
                          value={CASE_LOWER}
                          control={<Radio />}
                          label={t('ncrm_generalsetting_preferences_product_lower_case')}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};

export default SKUGenerator;
