import React, { useEffect, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel, TextField } from '@mui/material';
import { LEAD_CONTACT_METHOD_OPTIONS } from '@lead/config/constants';
import { LabelValue } from '@base/types/app';
import { IdName, KeyValue } from '@base/types/common';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import LeadSettingSelect from '@lead/containers/SettingSelect';
import { WRITE_TYPE_REFERRER } from '@settings/preferences/config/lead/constants';

interface ItemTypeProps extends CommonEditProps {
  value: IdName;
  onChange?: (val: IdName) => void;
}

const ContactMethodSelect = (props: ItemTypeProps) => {
  const { value, onChange, componentProps } = props;
  const [selected, setSelected] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      const newValue = LEAD_CONTACT_METHOD_OPTIONS?.find((v: IdName) => v.id === value.id);
      setSelected(newValue?.id ?? '');
    } else {
      setSelected('');
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue: string = event.target.value as string;
    const newSelected = LEAD_CONTACT_METHOD_OPTIONS.find((v: IdName) => v.id === newValue);
    setSelected(newValue);
    if (newSelected) onChange && onChange(newSelected);
  };
  const handleChangePreferred = (nVal: IdName) => {
    setSelected(nVal.id);
    onChange && onChange(nVal);
  };

  return (
    <>
      {componentProps?.isPreferred ? (
        <FormControl fullWidth>
          <LeadSettingSelect settingKey={WRITE_TYPE_REFERRER} value={value} onChange={handleChangePreferred} />
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <Select labelId="item-type-simple-select-label" id="item-type-simple-select" value={selected} onChange={handleChange}>
            {LEAD_CONTACT_METHOD_OPTIONS?.map((option: IdName, index: number) => (
              <MenuItem key={index} value={option.id}>
                {t(option.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default ContactMethodSelect;
