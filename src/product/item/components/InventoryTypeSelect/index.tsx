import React, { useEffect, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel, TextField } from '@mui/material';
import { PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS } from '@product/main/config/constants';
import { LabelValue } from '@base/types/app';
import { KeyValue } from '@base/types/common';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

interface InventoryTypeProps {
  value: string | number;
  onChange: (val: KeyValue) => void;
}

const InventoryTypeSelect = (props: InventoryTypeProps) => {
  const { value, onChange } = props;
  const [selected, setSelected] = useState<string>('');
  const { t } = useTranslation()

  useEffect(() => {
    if (value) {
      if (_.isString(value)) {
        const newValue: string = PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.find((v: LabelValue) => v.value === (value as string))
          ?.value as string;
        setSelected(newValue ?? '');
      } else {
        const newValue: string = PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.[(value as number) - 1]?.value as string;
        setSelected(newValue ?? '');
      }
    } else {
      setSelected('');
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue: string = event.target.value as string;
    const newSelected: KeyValue = {
      id: newValue,
      name: PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.find((v: LabelValue) => v.value === newValue)?.label
    };
    setSelected(newValue);
    onChange && onChange(newSelected);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="item-type-simple-select-label">Select...</InputLabel>
      <Select labelId="item-type-simple-select-label" id="item-type-simple-select" value={selected} onChange={handleChange}>
        {PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.map((option: LabelValue, index: number) => (
          <MenuItem key={index} value={option.value}>
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InventoryTypeSelect;
