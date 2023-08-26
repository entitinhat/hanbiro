import { Checkbox, FormControl, FormControlLabel, Stack } from '@mui/material';
import { isObject, uniqueId } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ICheckboxGroupProps {
  value: any[];
  options: any[];
  isVertical?: boolean;
  fieldValue?: string;
  fieldLabel?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  onChange: (params: any) => void;
  onClick?: () => void;
}
const CheckboxGroup: React.FC<ICheckboxGroupProps> = (props: ICheckboxGroupProps) => {
  const {
    value = [],
    options = [],
    isVertical = true,
    fieldValue = 'value',
    fieldLabel = 'label',
    name = uniqueId('check-box-'),
    disabled = false,
    readOnly = false,
    className = 'mg-r-10 wd-100p',
    onChange = (params: any) => {},
    onClick = () => {}
  } = props;
  const { t } = useTranslation();
  if (options.length === 0) return <> No Options</>;

  return (
    <FormControl>
      <Stack direction={`${isVertical ? 'column' : 'row'}`} flexWrap="wrap">
        {options.map((item: any, index) => (
          <FormControlLabel
            key={index}
            value={item[fieldValue]}
            control={
              <Checkbox
                onClick={() => onClick()}
                checked={
                  value.findIndex((_item: any) => {
                    if (isObject(_item)) {
                      return _item[fieldValue as keyof typeof _item] == item[fieldValue];
                    } else {
                      return _item == item[fieldValue];
                    }
                  }) !== -1
                }
                onChange={(e: any) => {
                  if (readOnly === false && onChange && typeof onChange === 'function') {
                    let valueNew = [];
                    if (e.target.checked) {
                      valueNew = value.concat(item);
                    } else {
                      valueNew = value.filter((itemChosed) => itemChosed[fieldValue] != item[fieldValue]);
                    }
                    onChange(valueNew);
                  }
                }}
              />
            }
            label={t(item[fieldLabel])}
            disabled={disabled || item?.disabled || readOnly}
          />
        ))}
      </Stack>
    </FormControl>
  );
};

export default CheckboxGroup;
