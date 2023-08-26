import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import MainCard from '@base/components/App/MainCard';
import { InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { BaseUnit, UnitValue } from '@product/unit/types/unit';
import UnitValueAutoComplete from '@product/unit/containers/UnitValueAutoComplete';
import { IdName } from '@base/types/common';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { TheatersOutlined } from '@mui/icons-material';

interface BaseUnitNameProps {
  value: BaseUnit;
  onChange?: (val?: BaseUnit) => void;
}

const BaseUnitName = (props: BaseUnitNameProps) => {
  const { value, onChange } = props;

  const theme = useTheme();

  // state
  const [baseUnit, setBaseUnit] = useState<BaseUnit>(value);
  const [unitValues, setUnitValues] = useState<UnitValue[]>([]);

  useEffect(() => {
    if (!_.isEqual(value, baseUnit)) {
      setBaseUnit(value);
    }

    if (value?.unitValues) {
      setUnitValues(value?.unitValues || []);
    }
  }, [value]);

  const handleUnitNameChange = (newValues: UnitValue | UnitValue[] | null) => {
    const newVal: BaseUnit = { ...baseUnit, unitValues: (newValues as UnitValue[]) ?? [] };
    setBaseUnit(newVal);

    // callback
    onChange && onChange(newVal);
  };
  //  {/* 상품의 Base Unit이 자동으로 적용됩니다. */}
  const renderBaseUnit = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Stack spacing={0.5}>
          {/*---------------------------------- New Concepts----------------------------------------- */}
          <InputLabel>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang="product_item_field_basic_unit" textOnly />
            <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
              *
            </Box>
          </InputLabel>
          <TextField
            sx={{
              '.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled ': {
                background: theme.palette.secondary.lighter,
                color: theme.palette.secondary.main
              }
            }}
            value={baseUnit?.name}
            size="medium"
            disabled
            id="basic_unit"
            variant="outlined"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Stack spacing={0.5}>
          <InputLabel>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang="product_item_field_basic_unitval" textOnly />
          </InputLabel>
          <UnitValueAutoComplete unit={baseUnit as IdName} single={false} value={unitValues || []} onChange={handleUnitNameChange} />
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <>
      {baseUnit?.id ? (
        renderBaseUnit()
      ) : (
        <Typography sx={{ color: 'red' }}>
          <SpanLang keyLang="ncrm_product_form_text_require_base_unit" textOnly />
        </Typography>
      )}
    </>
  );
};

export default BaseUnitName;
